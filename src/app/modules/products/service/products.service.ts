import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../model/products.model';
import StatusResponse from '../../../model/response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private readonly API_URL = environment.apiUrl;

  getProducts(): Observable<StatusResponse<Product[]>> {
    return this.http.get<StatusResponse<Product[]>>(
      `${this.API_URL}/clients/productos`
    );
  }

  createProduct(data: Product): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>(
      `${this.API_URL}/clients/productos`,
      data
    );
  }

  updateProduct(id: string, data: Product): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(
      `${this.API_URL}/clients/productos/${id}`,
      data
    );
  }

  deleteProduct(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(
      `${this.API_URL}/clients/productos/${id}`
    );
  }
}
