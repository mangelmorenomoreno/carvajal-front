import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/comentario/save';
  private baseUrlList: string = 'http://localhost:8000/cavajal/api/v1/comentario/list';
  private baseUrlEliminar: string = 'http://localhost:8000/cavajal/api/v1/comentario/delete';
  private baseUrlModificar: string = 'http://localhost:8000/cavajal/api/v1/comentario/update';
  
  constructor(private http: HttpClient) { }

  saveComentario(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrl, data, { headers: headers });
  }
  listComentario(token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.get(this.baseUrlList, { headers: headers });
  }

  deleteComentario(token: any, commentId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlEliminar, commentId, { headers: headers });
  }

  updateComentario(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlModificar, data, { headers: headers });
  }
}
