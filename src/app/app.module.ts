import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { FuncionarioService } from './funcionario/funcionario.service';
import { ControleEmbarqueDesembarqueService } from './controle-embarque-desembarque/controle-embarque-desembarque.service';
import {
  AlertModule,
  BsDatepickerModule,
  DatepickerModule,
  defineLocale,
  ptBrLocale,
  TooltipModule,
  ModalModule
} from 'ngx-bootstrap';
import { ControleEmbarqueDesembarqueComponent } from './controle-embarque-desembarque/controle-embarque-desembarque.component';
import { CadastroComponent } from './funcionario/cadastro/cadastro.component';
defineLocale('pt-br', ptBrLocale);
import { ChartsModule } from 'ng2-charts';
import { EmbarcadosPorDataComponent } from './relatorios/embarcados-por-filtro/embarcados-por-filtro.component';
import { PlataformaNavioService } from './plataforma-navio/plataforma-navio.service';
import { EmbarcadosPlataformaComponent } from './relatorios/embarcados-plataforma/embarcados-plataforma.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    ControleEmbarqueDesembarqueComponent,
    CadastroComponent,
    EmbarcadosPorDataComponent,
    EmbarcadosPlataformaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule
  ],
  providers: [ FuncionarioService, ControleEmbarqueDesembarqueService, FuncionarioComponent, PlataformaNavioService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
