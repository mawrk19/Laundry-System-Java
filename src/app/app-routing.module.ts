import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LoginComponent } from './login/login.component'; // Import the login component

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Set login as the default route
  { path: 'login', component: LoginComponent }, // Add the login route
  { path: 'details-of-employee/:id', component: ShowDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }