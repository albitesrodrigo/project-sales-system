import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StatusResponse from '../../../model/response.model';
import { Client } from '../../../model/clients.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = environment.apiUrl;

  getClients(): Observable<StatusResponse<Client[]>> {
    return this.http.get<StatusResponse<Client[]>>(
      `${this.API_URL}/clients/clientes`
    );
  }

  createClient(data: Client): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>(
      `${this.API_URL}/clientes`,
      data
    );
  }

  updateClient(id: string, data: Client): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(
      `${this.API_URL}/clientes/${id}`,
      data
    );
  }

  deleteClient(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(
      `${this.API_URL}/clientes/${id}`
    );
  }
}
