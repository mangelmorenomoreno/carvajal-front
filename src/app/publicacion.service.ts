import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/publicacion/save';
  private baseUrlList: string = 'http://localhost:8000/cavajal/api/v1/publicacion/list';
  private baseUrlEliminar: string = 'http://localhost:8000/cavajal/api/v1/publicacion/delete';
  private baseUrlModificar: string = 'http://localhost:8000/cavajal/api/v1/publicacion/update';
  constructor(private http: HttpClient) { }

  savePublicacion(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrl, data, { headers: headers });
  }
  listPublicacion(token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.get(this.baseUrlList, { headers: headers });
  }

  deletePublicacion(token: any, postId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlEliminar, postId, { headers: headers });
  }

  updatePublicacion(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlModificar, data, { headers: headers });
  }

}
