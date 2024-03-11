import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaswordService {

  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/credencial/create';

  constructor(private http: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const payload = {
      password: newPassword
    };
    
    // Configurando los headers para incluir el token
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrl, payload, { headers });
  }
}
