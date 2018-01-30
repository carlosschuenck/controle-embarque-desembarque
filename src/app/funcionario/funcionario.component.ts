import {Component, OnInit,  ViewChild, TemplateRef} from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioFiltro } from './entidade/filtro/funcionarioFiltro';
import { Funcionario } from './entidade/funcionario';
import {Router, ActivatedRoute, Data} from '@angular/router';
import { ControleEmbarqueDesembarqueService } from '../controle-embarque-desembarque/controle-embarque-desembarque.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PlataformaNavioService }  from '../plataforma-navio/plataforma-navio.service';
import { PlataformaNavio }  from '../plataforma-navio/entidade/plataformaNavio';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
})
export class FuncionarioComponent implements OnInit {
  @ViewChild('modalFuncionario') childModal: ModalDirective;
  public funcionarioList: Funcionario[];
  public filtro: FuncionarioFiltro = new FuncionarioFiltro();
  public modalRef: BsModalRef;
  public mensagem = {};

  /*Variavais utilizadas para o relatório por filtro*/
  public embarcadoList: Number[] = [];
  public naoEmbarcadoList: Number[] = [];

  /*Variaveis utilizadas para o relatório por veículo*/
  public plataformaNavioList: PlataformaNavio[] = [];
  public listaSomatorio = [];
  public listaVeiculoLabels = [];
  public listaNumeroVeiculoEmbarcado = [];

  constructor(private funcionarioService: FuncionarioService,
              private route: Router,
              private controleService: ControleEmbarqueDesembarqueService,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
              private plataformaService: PlataformaNavioService) { }

  ngOnInit() {
    this.buscarTodosFuncionarios();
  }

  buscarTodosFuncionarios(){
    this.funcionarioService.buscarTodos()
      .subscribe(
        funcionarios => {
          this.funcionarioList = funcionarios;
          this.embarcadoList = [];
          this.naoEmbarcadoList = [];
          for(let funcionario of this.funcionarioList){
            this.verficarEmbarqueDesembarque(funcionario);
          }
          this.buscarDadosRelatorioPlataforma();
      },
        erro => console.log(erro)
      );
  }

  buscarEmbarquesPorData(){
    console.log("this.filtro",this.filtro)
    this.mensagem = {};
    if(this.filtro.dataInicioEmbarque || this.filtro.dataFimEmbarque) {
      if( (this.filtro.dataInicioEmbarque && this.filtro.dataFimEmbarque) && (this.filtro.dataInicioEmbarque > this.filtro.dataFimEmbarque)){
        this.mensagem = {tipo: 'danger', titulo: 'Ops!', mensagem: 'A data fim não pode ser anterior a data início.'}
        return;
      }
      this.controleService
        .buscarPorData(this.filtro.dataInicioEmbarque, this.filtro.dataFimEmbarque)
        .subscribe(controlesEmbarqueDesembarque => {
            var funcionariosIds: Number[] = [];
            for (let controle of controlesEmbarqueDesembarque) {
              if (!controle.dataDesembarque) {
                funcionariosIds.push(controle.idFuncionario);
              }
            }

            if(funcionariosIds.length > 0){
              this.embarcadoList = [];
              this.naoEmbarcadoList = [];
              this.funcionarioService
                .buscarIds(funcionariosIds)
                .subscribe(functionarios => {
                  this.funcionarioList = functionarios;
                  for(let funcionario of this.funcionarioList){
                    this.verficarEmbarqueDesembarque(funcionario);
                  }
                }, err => {
                })
            }else{
              this.mensagem = {tipo: 'warning', titulo: 'Ops!', mensagem: 'Não existem funcionários embarcados para o período informado.'}
              this.funcionarioList = [];
            }


          },
          erro => console.log(erro)
        );
    }else {
      this.buscarTodosFuncionarios()
    }
  }
  verficarEmbarqueDesembarque(funcionario: Funcionario){
    this.controleService
      .buscarUltimoRegistro(funcionario.id)
      .subscribe( controleEmbarqueDesembarque => {
          if(controleEmbarqueDesembarque.length !== 0 && controleEmbarqueDesembarque[0].dataEmbarque && !controleEmbarqueDesembarque[0].dataDesembarque){
            funcionario.embarcado = true;
            funcionario.dataEmbarque = controleEmbarqueDesembarque[0].dataEmbarque;
            this.embarcadoList.push(this.embarcadoList.length + 1);
          }else{
            funcionario.embarcado = false;
            this.naoEmbarcadoList.push(this.embarcadoList.length + 1);
          }
        },
        erro => console.log(erro)
      );
  }

  excluirFuncionario(idFuncionario: Number, nome: String){
    this.funcionarioService
      .excluir(idFuncionario)
      .subscribe( funcionario => {
          this.mensagem = {tipo: 'success', titulo: 'Sucesso!', mensagem: 'O funcionário '+nome+' foi excluído com sucesso.'}
          this.buscarTodosFuncionarios();
        },
        erro => console.log(erro)
      );
  }

  excluir(idFuncionario: Number, nome: String){
    this.excluirControlers(idFuncionario, nome);
  }

  excluirControlers(idFuncionario: Number, nome: String){
    this.controleService.buscarIdFuncionario(idFuncionario).subscribe(controlers => {
      console.log(controlers)
      if(controlers.length === 0){
        this.excluirFuncionario(idFuncionario, nome);
      }else{
        let excluidos = 0;
        for(let controle of controlers){
          console.log("excluidos", excluidos, controle)
          this.controleService.excluir(controle.id).subscribe(resp => {
            excluidos++
            if(controlers.length === excluidos){
              this.excluirFuncionario(idFuncionario, nome);
            }
          })
        }
      }
    });
  }

  /*Preparando massa para o relatório por veículo*/
  buscarDadosRelatorioPlataforma(){
    this.plataformaService.buscarTodos().subscribe(plataformaNavioList => {
      this.plataformaNavioList = plataformaNavioList;
      this.plataformaNavioList.forEach(pn =>{
        this.montarListaSomatorio(pn);
      });
    });
  }

  montarListaSomatorio(pn: PlataformaNavio){
    var somatorioPorVeiculo = { nome: '', quantidade: 0}
    this.controleService.buscarIdVeiculo(pn.id).subscribe(list => {
      somatorioPorVeiculo.quantidade = list.length
      somatorioPorVeiculo.nome = pn.nome.toString();
      this.listaSomatorio.push(somatorioPorVeiculo);
      if(this.listaSomatorio.length == this.plataformaNavioList.length){
        this.listaSomatorio.forEach(obj => {
          this.listaVeiculoLabels.push(obj.nome.toString());
          this.listaNumeroVeiculoEmbarcado.push(obj.quantidade);
        })
      }
    })
  }


  /*Model de Exclusão*/
  abrirModalExclusao(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmarExclusao(idFuncionario: Number, nome: String): void {
    this.excluir(idFuncionario, nome);
    this.modalRef.hide();
  }

  fecharModalExclusao(): void {
    this.modalRef.hide();
  }

}
