import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Basket, Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  computeAllPrice<T>(basketItems: Basket[]): Promise<T> {
    const payload = {
      products: basketItems
    };

    return this.http.post<T>(`${this.baseUrl}/count-price`, payload).toPromise();
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(product: Product): Promise<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product).toPromise();
  }

  updateProduct(product: Product): Promise<Product> {
    return  this.http.patch<Product>(`${this.baseUrl}/${product._id}`, product).toPromise();
  }

  deleteProductById(id: string): Promise<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).toPromise();
  }
}

