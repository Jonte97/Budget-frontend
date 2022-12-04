import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { MonthComponent } from './components/month/month.component';
import { BudgetplanComponent } from './components/budgetplan/budgetplan.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/environments/environment';
import { AddOutcomeComponent } from './components/add-outcome/add-outcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryNavbarComponent } from './components/category-navbar/category-navbar.component';
import { OutcomeListComponent } from './components/outcome-list/outcome-list.component';
import { OutcomeItemComponent } from './components/outcome-item/outcome-item.component';
import { MonthNavigatorComponent } from './components/month-navigator/month-navigator.component';
import { IncomeSectionComponent } from './components/income-section/income-section.component';
import { IncomeListComponent } from './components/income-list/income-list.component';
import { IncomeItemComponent } from './components/income-item/income-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    MonthComponent,
    BudgetplanComponent,
    HeaderComponent,
    AddOutcomeComponent,
    CategoryNavbarComponent,
    OutcomeListComponent,
    OutcomeItemComponent,
    MonthNavigatorComponent,
    IncomeSectionComponent,
    IncomeListComponent,
    IncomeItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule { }
