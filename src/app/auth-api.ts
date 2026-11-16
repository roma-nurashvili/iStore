import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { JWT, login, Register, UserInfo } from './user-info';
import { CookieService } from 'ngx-cookie-service';

@Service()
export class AuthApi {
  private authApi = inject(HttpClient);
  private cookie = inject(CookieService)

  token() {
    return {
      headers: {Authorization: `Bearer ${this.cookie.get("user")}`}
    }
  }

  signIn(body: login) {
    return this.authApi.post<JWT>('https://api.everrest.educata.dev/auth/sign_in', body);
  }

  signUp(body: UserInfo) {
    return this.authApi.post<Register>('https://api.everrest.educata.dev/auth/sign_up', body)
  }

  getUserInfo() {
    return this.authApi.get<UserInfo>("https://api.everrest.educata.dev/auth", this.token())
  }
}
