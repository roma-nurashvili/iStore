import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../auth-api';
import { UserInfo } from '../user-info';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {
  constructor(private user: AuthApi, private cookie: CookieService) {
    this.getUserInfo()
  }

  public userData = signal<UserInfo | undefined>(undefined)

  getUserInfo() {
    this.user.getUserInfo().subscribe({
      next: (data: UserInfo) => this.userData.set(data),
      error: (error: Error) => console.log(error)
    })
  }

  signOut() {
    this.cookie.delete("user")
    window.location.reload()
  }

  public productSearch = ""
  isAuthenticated = input(false);
  signInRequested = output<void>();

}
