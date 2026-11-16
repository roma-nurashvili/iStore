import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { Auth } from './auth/auth';

@Component({
  imports: [RouterOutlet, Navigation, Auth],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('iStore');
  protected isAuthVisible = signal(false);

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

  protected isAuthenticated = signal(false);
}
