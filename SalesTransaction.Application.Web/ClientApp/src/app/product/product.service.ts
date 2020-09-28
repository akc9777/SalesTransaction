import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: WebApiService) { }

  addProduct(json): Observable<any> {
    return this.api.post('product/addproduct', json);
  }

  editProduct(json): Observable<any> {
    return this.api.post('product/editproduct', json);
  }

  getAllProduct() {
    return this.api.get('product/getallproduct');
  }
}
