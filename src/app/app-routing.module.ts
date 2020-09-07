import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CreateQuoteComponent } from './quote/create-quote/create-quote.component';

const routes: Routes = [
  { path: 'login', component: SignUpComponent, data: { isLogin: true } },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'create', component: CreateQuoteComponent },
  {
    path: 'update/:id',
    component: CreateQuoteComponent,
    data: { isUpdate: true },
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
