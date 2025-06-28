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
      'clients/clientes'
    );
  }

  createClient(data: Client): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>('/clientes', data);
  }

  updateClient(id: string, data: Client): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(`/clientes/${id}`, data);
  }

  deleteClient(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(`/clientes/${id}`);
  }
}
