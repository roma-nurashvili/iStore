import { Component, output, signal } from '@angular/core';
import { JWT, login, Register, UserInfo } from '../user-info';
import { email, form, FormField, min, minLength, pattern, required } from '@angular/forms/signals';
import { AuthApi } from '../auth-api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [FormField],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth {
  constructor(
    private service: AuthApi,
    private cookie: CookieService,
  ) {}

  public isRegistrationVisible = signal(false);
  closed = output<void>();
  signedIn = output<void>();

  showRegistration() {
    this.isRegistrationVisible.set(true);
  }

  showLogin() {
    this.isRegistrationVisible.set(false);
  }

  closeAuth() {
    this.closed.emit();
  }

  public userData = signal<login>({
    email: '',
    password: '',
  });

  public registerData = signal<UserInfo>({
    firstName: '',
    lastName: '',
    age: null,
    email: '',
    password: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: '',
  });

  public loginData = form(this.userData, (field) => {
    required(field.email, {message: "Enter your email!"}),
    required(field.password, {message: "Enter your password!"})
  });
  public signUpData = form(this.registerData, (field) => {
    required(field.firstName, {message: "Required field!"})
    required(field.lastName, {message: "Required field!"})
    required(field.age, {message: "Required field!"})
    min(field.age, 12, {message: "You must be at least 12 years old!"})
    required(field.email, {message: "Required field!"})
    email(field.email, {message: "Enter the valid email address!"})
    pattern(field.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, {message: "Enter the valid email address!"})
    required(field.password, {message: "Required field!"})
    minLength(field.password, 8, {message: "Password must contain at least 8 characters!"})
    required(field.address, {message: "Required field!"})
    required(field.phone, {message: "Required field!"})
    pattern(field.phone, /^\+995\d{9}$/, {message: "Phone must start with +995 followed by 9 digits!"})
    required(field.zipcode, {message: "Required field!"})
    required(field.avatar, {message: "Required field!"})
    required(field.gender, {message: "Required field!"})
  })

  private personalData = signal<Register | undefined>(undefined)

  signIn(e: Event) {
    e.preventDefault();
    this.service.signIn(this.loginData().value()).subscribe({
      next: (data: JWT) => {
        this.cookie.set('user', data.access_token, {path: '/'});
        this.signedIn.emit();
      },
      error: (error: Error) => console.log(error),
    });
  }

  signUp(e: Event) {
    e.preventDefault()

    this.service.signUp(this.signUpData().value()).subscribe({
      next: (data: Register) => {
        this.personalData.set(data);
        this.closeAuth();
      },
      error: (error: Error) => console.log(error)
    })
  }
}
