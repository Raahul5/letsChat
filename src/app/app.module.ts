import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '../app/token.interceptors'
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, withFetch } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {postReducer} from './store/reducers/post.reducers'
import {userReducer} from './store/reducers/user.reducer'
import {PostEffects} from './store/effects/post.effect'
import { PracticeComponent } from './practice/practice.component';
import { InnerComponent } from './practice/inner/inner.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { samplereducer } from './store/reducers/sample.reducers';

@NgModule({
    declarations: [
        AppComponent,
        PracticeComponent,
        InnerComponent,
        MenuComponent,
        UnauthorizedComponent, 
    ],
    bootstrap: [AppComponent], 
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ postStore: postReducer, userStore: userReducer,sampleStore:samplereducer }), 
        EffectsModule.forRoot([PostEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
    ],
        
        providers: [
        provideHttpClient(withFetch()),
        provideClientHydration(),
        provideAnimationsAsync(),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
