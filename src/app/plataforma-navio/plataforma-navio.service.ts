import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { PlataformaNavio } from './entidade/plataformaNavio'

@Injectable()
export class PlataformaNavioService {

  url = 'http://localhost:3000/plataforma_navio';
  constructor(private httpClient: HttpClient) { }

  buscarTodos(): Observable<PlataformaNavio[]>{
    return this.httpClient
      .get<PlataformaNavio[]>(this.url);
  }

}
