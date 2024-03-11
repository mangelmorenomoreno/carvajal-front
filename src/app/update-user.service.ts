import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
 
  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/usuario/update';
  private baseUrlPassword: string = 'http://localhost:8000/cavajal/api/v1/credencial/update';
  constructor(private http: HttpClient) {}

  updateUser(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrl, user, { headers: headers });
  }
  
  updateUserPasword(pasword: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlPassword, pasword, { headers: headers });
  }
  
}
