import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import {MainService} from './main.service';
import { Store } from '@ngrx/store';
describe('AppComponent', () => {

  beforeEach(async () => {
    let service : MainService
    let store : MockStore
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[MainService, provideMockStore({})]
    }).compileComponents();

    service = TestBed.inject(MainService)
    store = TestBed.inject(Store) as MockStore
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
