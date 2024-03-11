import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InfoUserService {

  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/usuario/findByToken';
  
  constructor(private http: HttpClient) {}

  findUser( token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.get(this.baseUrl, { headers: headers });
  }
}
