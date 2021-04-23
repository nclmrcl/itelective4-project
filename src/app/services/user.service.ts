import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginState: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loginState;
  }

  setLogin(): void {
    this.loginState = true;
  }

  setLogout(): void {
    this.loginState = false;
  }

}
