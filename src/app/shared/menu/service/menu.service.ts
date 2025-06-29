import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import StatusResponse from '../../../model/response.model';
import { Notificacion } from '../../../model/notificacion-model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {


    private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNotificacionesNoVistasCount(): Observable<StatusResponse<number>> {
    return this.http.get<StatusResponse<number>>(
      `${this.API_URL}/sales/no-vistas/count`
    );
  }

  getNotificaciones(): Observable<StatusResponse<Notificacion[]>> {
    return this.http.get<StatusResponse<Notificacion[]>>(
      `${this.API_URL}/sales/notificaciones/ventas`
    );
  }

  marcarComoVista(id: number): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(
      `${this.API_URL}/sales/notificaciones/${id}/vista`,
      null
    );
  }

  getVentaPorNro(nroventa: string) {
  return this.http.get<any>(`${this.API_URL}/sales/${nroventa}`);
}
}
