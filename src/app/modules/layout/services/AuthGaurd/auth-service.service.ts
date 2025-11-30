import { Injectable } from '@angular/core';

// Service to handle JWT token and permissions
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

   isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Optional: Check token expiration
      if (payload.exp) {
        const expirationDate = new Date(payload.exp * 1000);
        if (expirationDate < new Date()) {
          return false; // Token expired
        }
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
  // Decode JWT token and extract permissions
  getPermissions(): string[] {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (!token) return [];
     debugger;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.Permission || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }

  // Check if user has any of the required permissions
  hasAnyPermission(requiredPermissions: string[]): boolean {
    const userPermissions = this.getPermissions();
    return requiredPermissions.some(perm => userPermissions.includes(perm));
  }
}
