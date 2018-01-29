import {PlataformaNavio} from '../../plataforma-navio/entidade/plataformaNavio';

export class ControleEmbarqueDesembarque {
  public id: Number;
  public dataEmbarque: Date;
  public dataDesembarque: Date;
  public idFuncionario: Number;
  public idPlataformaNavio: PlataformaNavio;

  constructor(){}
}
