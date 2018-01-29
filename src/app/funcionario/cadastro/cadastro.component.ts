import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FuncionarioComponent } from '../funcionario.component';
import { FuncionarioService } from '../funcionario.service';
import { Funcionario } from '../entidade/funcionario';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: 'cadastro.component.html'
})
export class CadastroComponent implements OnInit{

  @ViewChild('modalFuncionario') modalFuncionario: ModalDirective;
  @Input() idFuncionario: Number;
  functionario: Funcionario = new Funcionario();
  mensagem = {};
  constructor(private funcionarioComponente: FuncionarioComponent, private  funcionarioService: FuncionarioService){}

  ngOnInit(){}

  abrirModal(): void {
    if(this.idFuncionario){
      this.funcionarioService
          .buscarId(this.idFuncionario)
          .subscribe(funcionario => {
            console.log("funcionario", funcionario)
            this.functionario = funcionario;
          },
            err => {
            console.log(err)
          });
    }
    this.modalFuncionario.show();
  }

  fecharModal(formFuncionario): void {
    this.funcionarioComponente.buscarTodosFuncionarios();
    this.functionario = new Funcionario();
    this.modalFuncionario.hide();
    formFuncionario.submitted = false;
    this.mensagem = {};
  }

  cadastrarFuncionario(formFuncionario){
    if(formFuncionario.valid){
      if(this.functionario.id){
        this.funcionarioService
            .atualizar(this.functionario)
            .subscribe(
              funcionario => {
                this.mensagem = {tipo: 'success', titulo: 'Sucesso!', mensagem: 'O funcionário '+this.functionario.nome+' foi atualizado com sucesso.'}
                formFuncionario.submitted = false;
              },
              erro => console.log(erro)
           );
      }else{
        this.funcionarioService.cadastrar(this.functionario).subscribe(
          funcionario => {
            this.mensagem = {tipo: 'success', titulo: 'Sucesso!', mensagem: 'O funcionário '+this.functionario.nome+' foi cadastrado com sucesso.'}
            this.functionario = new Funcionario();
            formFuncionario.submitted = false
          },
          erro => console.log(erro)
        );
      }
    }else{
      this.mensagem = {tipo: 'danger', titulo: 'Ops!', mensagem: 'Por favor, verique os dados informados!'}
    }
  }

}
