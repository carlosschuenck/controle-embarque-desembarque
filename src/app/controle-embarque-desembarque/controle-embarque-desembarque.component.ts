import {Component, OnInit, Output} from '@angular/core';
import { ControleEmbarqueDesembarque } from './entidade/controle-embarque-desembarque'
import { ControleEmbarqueDesembarqueService } from './controle-embarque-desembarque.service'
import { Router, ActivatedRoute } from '@angular/router';
import { PlataformaNavioService }  from '../plataforma-navio/plataforma-navio.service'
import { PlataformaNavio }  from '../plataforma-navio/entidade/plataformaNavio'
@Component({
  selector: 'app-controle-embarque-desembarque',
  templateUrl: './controle-embarque-desembarque.component.html'
})
export class ControleEmbarqueDesembarqueComponent implements OnInit {
  public controle: ControleEmbarqueDesembarque = new ControleEmbarqueDesembarque();
  public plataformaNavioList: PlataformaNavio[] = [];
  public isDesembarque = false;
  mensagem = {};
  constructor(private controleService: ControleEmbarqueDesembarqueService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private plataformaService: PlataformaNavioService) {
    this.activatedRoute.params.subscribe(params => {
      this.controle.idFuncionario = +params['id'];
    });
  }

  ngOnInit() {
    this.buscarUltimoRegistro();
    this.plataformaService.buscarTodos().subscribe(plataformaNavioList => {
        this.plataformaNavioList = plataformaNavioList
    });
  }

  buscarUltimoRegistro(){
    this.controleService
        .buscarUltimoRegistro(this.controle.idFuncionario)
        .subscribe( controleEmbarqueDesembarque => {
            if(controleEmbarqueDesembarque.length !== 0 && controleEmbarqueDesembarque[0].dataEmbarque && !controleEmbarqueDesembarque[0].dataDesembarque){
                this.controle = controleEmbarqueDesembarque[0];
              this.controle.dataEmbarque = new Date(this.controle.dataEmbarque);
              this.isDesembarque = true;
            }
          },
          erro => console.log(erro)
        );
  }

  embarcarOuDesembarcarFuncionario(formControle){
    if(formControle.valid){
      if(this.controle.id){
        if(new Date(this.controle.dataEmbarque) >  new Date(this.controle.dataDesembarque)){
          this.mensagem = {tipo: 'danger', titulo: 'Ops!', mensagem: 'A data de desembarque não pode ser anterior a data de embarque.'}
          formControle.submitted = false;
          return;
        }//
        this.controleService
          .atualizar(this.controle)
          .subscribe(
            controleEmbarqueDesembarque => this.route.navigate(['/', 'O funcionário foi desembarcado com exito!']),
            erro => console.log(erro)
          );
      }else{
        this.controleService
          .cadastrar(this.controle)
          .subscribe(
            controleEmbarqueDesembarque =>  this.route.navigate(['/', 'O funcionário foi embarcado com exito!']),
            erro => console.log(erro)
          );
      }
    }else{
      this.mensagem = {tipo: 'danger', titulo: 'Ops!', mensagem: 'Por favor, verique os dados informados!'}
    }
  }
}
