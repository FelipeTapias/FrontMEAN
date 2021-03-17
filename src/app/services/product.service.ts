import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/products/';

  getProducts(): Observable<any>{
    return this.http.get(this.url);
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  createProduct(product: Product): Observable<any>{
    return this.http.post(this.url, product);
  }

  getProduct(id: string): Observable<any>{
    return this.http.get(this.url + id)
  }

  editProduct(id: string, product:Product): Observable<any>{
    return this.http.put(this.url + id, product);
  }

}
