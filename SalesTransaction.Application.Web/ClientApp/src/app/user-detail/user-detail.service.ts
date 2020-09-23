import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private api: WebApiService) { }

  getLogin(json): Observable<any> {
    return this.api.post('account/login', json)
  }

  getUserDetail(id) {
    return this.api.get('account/userdetail', JSON.stringify({ customerId: id }));
  }

  getAllUserDetail() {
    return this.api.get('account/getallcustomer');
  }
}
