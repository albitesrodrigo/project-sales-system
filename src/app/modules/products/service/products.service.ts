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
      `/api/producto/${nameProduct}`
    );
  }

  getProductById(id: string): Observable<StatusResponse<Product>> {
    return this.http.get<StatusResponse<Product>>(`/api/producto/${id}`);
  }

  createProduct(data: Product): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>('/api/producto', data);
  }

  updateProduct(id: string, data: Product): Observable<StatusResponse<any>> {
    return this.http.put<StatusResponse<any>>(`/api/producto/${id}`, data);
  }

  deleteProduct(id: string): Observable<StatusResponse<any>> {
    return this.http.delete<StatusResponse<any>>(`/api/producto/${id}`);
  }
}
