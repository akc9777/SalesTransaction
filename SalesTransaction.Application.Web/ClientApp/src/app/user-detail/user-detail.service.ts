import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private api: WebApiService) { }

  addUser(json): Observable<any> {
    return this.api.post('account/adduser', json);
  }

  editUser(json): Observable<any> {
    return this.api.put('account/edituser', json);
  }

  getLogin(json): Observable<any> {
    return this.api.post('account/login', json)
  }

  getUserDetail(id) {
    return this.api.get('account/userdetail', JSON.stringify({ customerId: id }));
  }

  getAllUserDetail() {
    return this.api.get('account/getalluser');
  }
}
