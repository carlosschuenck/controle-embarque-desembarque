export class Funcionario {

  public id: Number
  public nome: String
  public funcao: String
  public empresa: String
  public embarcado: Boolean;
  public dataEmbarque: Date;

  constructor(){
      this.nome = ""
      this.funcao = ""
      this.empresa = ""
      this.embarcado = false;
      this.dataEmbarque = null;
  }
}
