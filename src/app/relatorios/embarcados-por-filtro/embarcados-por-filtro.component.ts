import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-embarcados-por-filtro',
  templateUrl: 'embarcados-por-filtro.component.html'
})
export class EmbarcadosPorDataComponent implements OnInit {

  @ViewChild('modalEmbarcadosHoje') modalEmbarcadosHoje: ModalDirective;

  @Input() public embarcados: Number;
  @Input() public naoEmbarcados: Number;

  // Doughnut
  public titulosGrafico:string[] = ['Embarcados', 'Não embarcados'];
  public dadosGrafico = [this.embarcados, this.naoEmbarcados];
  public tipoGrafico:string = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

  abrirModal(): void {
    this.dadosGrafico = [this.embarcados, this.naoEmbarcados];
    this.modalEmbarcadosHoje.show();
  }

  fecharModal(formFuncionario): void {
    this.modalEmbarcadosHoje.hide();
  }
}
