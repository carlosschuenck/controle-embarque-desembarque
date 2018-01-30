export class Funcionario {

  public id: Number
  public nome: String
  public funcao: String
  public empresa: String
  public embarcado: Boolean;

  constructor(){
      this.nome = ""
      this.funcao = ""
      this.empresa = ""
      this.embarcado = false;
  }
}
