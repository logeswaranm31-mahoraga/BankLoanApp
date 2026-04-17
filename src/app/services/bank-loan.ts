import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/env.dev';
import { API_ENDPOINTS } from '../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class BankLoan {
  public http = inject(HttpClient);
  public API_URL = environment.apiUrl;

  public login(body: any) {
    return this.http.post(this.API_URL + API_ENDPOINTS.login, body)
  }
  
  public registerAsBankUser(body: any) {
    return this.http.post(this.API_URL + API_ENDPOINTS.registerAsBankUser, body)
  }

  public registerCustomer(body: any) {
    return this.http.post(this.API_URL + API_ENDPOINTS.registerCustomer, body)
  }

  public addNewApplication(body: any) {
    return this.http.post(this.API_URL + API_ENDPOINTS.addNewApplication, body)
  }
  public getMyApplications(id:number) {
    return this.http.get(this.API_URL + API_ENDPOINTS.getMyApplications+'?customerId='+id);
  }
}
