import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TokenInterceptor} from '../app/token.interceptors'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http'
import {HomeModule} from '../app/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
