import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../model/products.model';
import StatusResponse from '../../../model/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(nameProduct: string): Observable<StatusResponse<Product[]>> {
    return this.http.get<StatusResponse<Product[]>>(
      'clients/productos'
    );
  }

  createProduct(data: Product): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>('/productos', data);
  }

  updateProduct(id: string, data: Product): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(`/productos/${id}`, data);
  }

  deleteProduct(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(`/productos/${id}`);
  }
}
