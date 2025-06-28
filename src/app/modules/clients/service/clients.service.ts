import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StatusResponse from '../../../model/response.model';
import { Client } from '../../../model/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(nameClient: string): Observable<StatusResponse<Client[]>> {
    return this.http.get<StatusResponse<Client[]>>(
      `/api/clients/${nameClient}`
    );
  }

  getClientById(id: string): Observable<StatusResponse<Client>> {
    return this.http.get<StatusResponse<Client>>(`/api/clients/${id}`);
  }

  createClient(data: Client): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>('/api/clients', data);
  }

  updateClient(id: string, data: Client): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(`/api/clients/${id}`, data);
  }

  deleteClient(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(`/api/clients/${id}`);
  }
}
