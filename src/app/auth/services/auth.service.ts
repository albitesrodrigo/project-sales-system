import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StatusResponse from '../../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(data: any): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>('/api/login', data);
  }
}
