import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleEmbarqueDesembarqueComponent } from './controle-embarque-desembarque/controle-embarque-desembarque.component'
import { FuncionarioComponent } from './funcionario/funcionario.component'

const routes: Routes = [
  { path: 'controle-embarque-desembarque/:id', component: ControleEmbarqueDesembarqueComponent },
  { path: '**', component: FuncionarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
