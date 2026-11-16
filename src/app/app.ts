import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { Auth } from './auth/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [RouterOutlet, Navigation, Auth],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('iStore');
  protected isAuthVisible = signal(false);
  protected isAuthenticated = signal(false);

  constructor(private cookie: CookieService) {
    this.isAuthenticated.set(this.cookie.check('user'));
  }

  openAuth() {
    this.isAuthVisible.set(true);
  }

  handleSignedIn() {
    this.isAuthenticated.set(true);
    this.closeAuth();
  }

  closeAuth() {
    this.isAuthVisible.set(false);
  }

}
