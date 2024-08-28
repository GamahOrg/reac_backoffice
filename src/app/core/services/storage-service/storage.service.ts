import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/token-response.model';
import { DepartmentType } from '@app/core/models/enums/department-type.model';

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
  saveDepartmentType(departmentType: DepartmentType): void {
    localStorage.setItem('departmentType', departmentType.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getDepartmentType(): string | null {
    return localStorage.getItem('departmentType');
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }

}
