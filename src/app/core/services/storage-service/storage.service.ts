import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/token-response.model';

@Injectable()
export class StorageService {

  constructor() { }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  saveTokens(token: TokenResponse): void {
    localStorage.setItem('token', token.accessToken);
    localStorage.setItem('refresh-token', token.refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }

}
