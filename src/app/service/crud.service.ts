import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente, ClienteResponseDTO, Page } from '../models/dialog.component.models';
import { Observable } from 'rxjs';
import { Byte } from '@angular/compiler/src/util';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn:'root'
})
export class CrudService {

  private elementApiUrl = 'http://localhost:8080/api/crud';
  constructor(private http: HttpClient) {  }

  listClient(page:number,size:number): Observable<Page<Cliente>>{
    return this.http.get<Cliente[]>(`${this.elementApiUrl}/listAll?page=${page}&size=${size}`,{observe: 'response'})
    .pipe(
      map((response: any) => <Page<Cliente>>Page.fromResponse(response))
  );
  }
  createClient(client:Cliente):Observable<Cliente>{
    console.log(client);
    return this.http.post<Cliente>(this.elementApiUrl+'/save',client);
  }

  getClient(id:number):Observable<ClienteResponseDTO>{
    return this.http.get<ClienteResponseDTO>(`${this.elementApiUrl}/getClient/${id}`);
  }

  deleteClient(id:number){
    return this.http.delete<any>(`${this.elementApiUrl}/delete/${id}`);
  }
}
