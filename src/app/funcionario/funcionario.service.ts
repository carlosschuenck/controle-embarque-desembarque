import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Funcionario } from './entidade/funcionario'

@Injectable()
export class FuncionarioService {

  url = 'http://localhost:3000/funcionarios';

  constructor(private httpClient: HttpClient) { }

  buscarTodos(): Observable<Funcionario[]>{
    return this.httpClient
               .get<Funcionario[]>(this.url);
  }

  buscarIds(ids: Number[]): Observable<Funcionario[]>{
    var path = '?id='
    if(ids.length === 1){
      return this.httpClient
        .get<Funcionario[]>(this.url+path+ids[0]);
    }else if(ids.length > 1){
      path += ids[0];
      for(var i = 1 ; i < ids.length; i++){
        path += '&id='+ids[i];
      }
      return this.httpClient
                 .get<Funcionario[]>(this.url+path);
    }
  }

  buscarId(id: Number): Observable<Funcionario>{
     return this.httpClient
                .get<Funcionario>(this.url+'/'+id);
  }

  cadastrar(funcionario: Funcionario): Observable<Funcionario>{
    return this.httpClient
              .post<Funcionario>(this.url, funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario>{
    return this.httpClient
      .put<Funcionario>(this.url+'/'+funcionario.id, funcionario);
  }

  excluir(idFuncionario: Number): Observable<Funcionario>{
    return this.httpClient
      .delete<Funcionario>(this.url+'/'+idFuncionario);
  }
}
