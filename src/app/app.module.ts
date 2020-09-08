import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './sign-up/store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './sign-up/store/app.state';
import { QuotesListComponent } from './quote/quotes-list/quotes-list.component';
import { CreateQuoteComponent } from './quote/create-quote/create-quote.component';
import { QuoteEffects } from '../app/quote/quote-store/effects/quote.effects';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    QuotesListComponent,
    CreateQuoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, QuoteEffects]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
