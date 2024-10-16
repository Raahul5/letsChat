import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '../app/token.interceptors'
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http'
import { HomeModule } from '../app/home/home.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {postReducer} from './store/reducers/post.reducers'
import {userReducer} from './store/reducers/user.reducer'
import {PostEffects} from './store/effects/post.effect'
import { HomeComponent } from './home/home.component';
import { HomeDialogComponent } from './home/home-dialog/home-dialog.component';
import { PracticeComponent } from './practice/practice.component';
import { InnerComponent } from './practice/inner/inner.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
        PracticeComponent,
        InnerComponent,
        MenuComponent
        
    ],
    bootstrap: [AppComponent], 
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIcon,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ postStore: postReducer, userStore: userReducer }), 
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
