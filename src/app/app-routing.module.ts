import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetplanComponent } from './components/budgetplan/budgetplan.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonthComponent } from './components/month/month.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'budgetplan', component: BudgetplanComponent },
  { path: 'month/:month', component: MonthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
