import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../auth-api';
import { UserInfo } from '../user-info';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FilterApi } from '../filter-api';
import { Product, productItem } from '../product';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {
  constructor(private user: AuthApi, private searchApi: FilterApi, private cookie: CookieService) {
    this.getUserInfo()
    this.search()
  }

  public userData = signal<UserInfo | undefined>(undefined)
  public isAccInfoVisible = signal(false)

  toggleAccInfo() {
    this.isAccInfoVisible.update((visible) => !visible)
  }

  closeAccInfo() {
    this.isAccInfoVisible.set(false)
  }

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

  public productSearch = signal<string>("")
  public isSearchOpen = signal(false)
  public searchedProducts = signal<productItem[]>([])
  isAuthenticated = input(false);
  signInRequested = output<void>();

  onSearchChange(keyword: string) {
    this.productSearch.set(keyword)
    this.isSearchOpen.set(keyword.trim().length > 0)
  }

  closeSearch() {
    this.isSearchOpen.set(false)
  }

  search() {
    toObservable(this.productSearch).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.searchApi.search(keyword))
    ).subscribe({
      next: (data: Product) => this.searchedProducts.set(data.products)
    })
  }

}
