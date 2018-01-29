import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ControleEmbarqueDesembarque } from './entidade/controle-embarque-desembarque'

@Injectable()
export class ControleEmbarqueDesembarqueService {
  url = 'http://localhost:3000/controle_embarque_desembarque';

  constructor(private httpClient: HttpClient) {}

  cadastrar(controle: ControleEmbarqueDesembarque): Observable<ControleEmbarqueDesembarque>{
    return this.httpClient
      .post<ControleEmbarqueDesembarque>(this.url, controle);
  }

  atualizar(controle: ControleEmbarqueDesembarque): Observable<ControleEmbarqueDesembarque>{
    return this.httpClient
      .put<ControleEmbarqueDesembarque>(this.url+'/'+controle.id, controle);
  }

  excluir(id:Number){
    return this.httpClient
               .delete(this.url+'/'+id);
  }

  buscarUltimoRegistro(idFuncionario: Number): Observable<ControleEmbarqueDesembarque[]>{
    return this.httpClient
      .get<ControleEmbarqueDesembarque[]>(this.url+'?idFuncionario='+idFuncionario+'&_sort=id&_order=desc&_limit=1');
  }

  buscarPorData(dataInico: Date, dataFim: Date): Observable<ControleEmbarqueDesembarque[]>{

    dataInico ? dataInico.setHours(0,0,0) :  dataInico = null;
    if(dataInico && dataFim){
      return this.httpClient
        .get<ControleEmbarqueDesembarque[]>(this.url+'?dataEmbarque_gte='+dataInico.toISOString()+'&dataEmbarque_lte='+ dataFim.toISOString());
    }else if(dataInico){
      return this.httpClient
        .get<ControleEmbarqueDesembarque[]>(this.url+'?dataEmbarque_gte='+new Date(dataInico).toISOString());
    }else if (dataFim){
      return this.httpClient
        .get<ControleEmbarqueDesembarque[]>(this.url+'?dataEmbarque_lte='+ new Date(dataFim).toISOString());
    }
  }

  buscarIdFuncionario(idFuncionario: Number): Observable<ControleEmbarqueDesembarque[]>{
      return this.httpClient
        .get<ControleEmbarqueDesembarque[]>(this.url+'?idFuncionario='+idFuncionario);
  }

  buscarIdVeiculo(idVeiculo: Number): Observable<ControleEmbarqueDesembarque[]>{
    return this.httpClient
               .get<ControleEmbarqueDesembarque[]>(this.url+'?idPlataformaNavio='+idVeiculo);
  }
}
