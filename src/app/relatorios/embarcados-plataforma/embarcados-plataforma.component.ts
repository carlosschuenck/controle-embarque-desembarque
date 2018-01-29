import { Component, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PlataformaNavioService }  from '../../plataforma-navio/plataforma-navio.service';
import { PlataformaNavio }  from '../../plataforma-navio/entidade/plataformaNavio';
import { ControleEmbarqueDesembarqueService } from '../../controle-embarque-desembarque/controle-embarque-desembarque.service'
import {Color} from 'ng2-charts';


@Component({
  selector: 'app-embarcados-plataforma',
  templateUrl: 'embarcados-plataforma.component.html'
})
export class EmbarcadosPlataformaComponent{

  @ViewChild('modalEmbarcadosHoje') modalEmbarcadosHoje: ModalDirective;

  @Input() public listaVeiculoLabels;
  @Input() public listaNumeroVeiculoEmbarcado;
  public pieChartType:string = 'pie';

  colors: Array<Color> = [{
    backgroundColor: ["#5dd55d", "#355efd", "#ffb84d", "#ff4d4d", "#ffa31a"]
  }];

  constructor(private plataformaService: PlataformaNavioService,
              private controleService: ControleEmbarqueDesembarqueService) { }

  abrirModal(): void {
    this.modalEmbarcadosHoje.show();
  }

  fecharModal(formFuncionario): void {
    this.modalEmbarcadosHoje.hide();
  }







}
