import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import StatusResponse from '../../../model/response.model';
import { Sale } from '../../../model/sales.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = environment.apiUrl;

  getSales(): Observable<StatusResponse<Sale[]>> {
    return this.http.get<StatusResponse<Sale[]>>(`${this.API_URL}/sales`);
  }

  createSales(data: any): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>(`${this.API_URL}/sales`, data);
  }
}
