import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environment';
import { ApiResponse } from '../../model/apiResponse.model';
import { Menu } from '../../model/menu.model'; // Asegúrate que sea tu modelo

const AUTH_TOKEN_KEY = 'primeLandAuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

 login(credentials: { username: string; password: string }): Observable<any> {
  return this.http.post(`${this.API_URL}/auth/login`, credentials).pipe(
    tap((response: any) => {

      const token = response?.access_token;
      if (token) {
        this.setAuthToken(token);
      }
    })
  );
}


  private setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private checkAuthStatus(): void {
    const token = this.getAuthToken();
    this.isAuthenticatedSubject.next(!!token);
  }

getMenus(): Observable<ApiResponse<Menu[]>> {
  const token = this.getAuthToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<ApiResponse<Menu[]>>(
    `${this.API_URL}/clients/menu/por-rol`,
    { headers }
  );
}

}
