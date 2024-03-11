import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private baseUrl: string = 'http://localhost:8000/cavajal/api/v1/respuestaComentario/save';
  private baseUrlList: string = 'http://localhost:8000/cavajal/api/v1/respuestaComentario/list';
  private baseUrlEliminar: string = 'http://localhost:8000/cavajal/api/v1/respuestaComentario/delete';
  private baseUrlModificar: string = 'http://localhost:8000/cavajal/api/v1/respuestaComentario/update';
  
  constructor(private http: HttpClient) { }

  saveRespuestaComentario(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrl, data, { headers: headers });
  }
  listRespuestaComentario(token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.get(this.baseUrlList, { headers: headers });
  }

  deleteRespuestaComentario(token: any, respuestaId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlEliminar, respuestaId, { headers: headers });
  }

  updateRespuestaComentario(data: any, token: any,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(this.baseUrlModificar, data, { headers: headers });
  }
}
