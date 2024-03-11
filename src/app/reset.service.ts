import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/credencial/resetPassword/';

  constructor(private http: HttpClient) { }

  resetPassword(email: string): Observable<any> {
    //return this.http.post(this.baseUrl, { email });
    const url = `${this.baseUrl}${encodeURIComponent(email)}`;
    return this.http.post(url, {});

  }
}
