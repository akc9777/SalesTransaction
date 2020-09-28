import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private api: WebApiService) { }

  addSales(json: any): Observable<any> {
    return this.api.post('sales/addsales', json);
  }

  editSales(json: any): Observable<any> {
    return this.api.put('sales/editsales', json);
  }

  getAllSales() {
    return this.api.get('sales/getallsales');
  }
}
