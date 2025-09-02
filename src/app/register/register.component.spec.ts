import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {MainService} from '../main.service'
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let service : jasmine.SpyObj<MainService>;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;


  const initialState = {
  
    register: {
      posts:[],
    loading:false,
    error:null
    },
  };
  beforeEach(async () => {
    const servicespy = jasmine.createSpyObj('service',['postData'])
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports:[RegisterComponent],
      providers:[
        provideHttpClient (), 
        provideMockStore({ initialState }), 
        {provide:service, useValue:servicespy},
        {provide:snackBar, useValue:snackBarSpy},
        {provide:router, useValue:routerSpy}
       
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore); 
    service =  TestBed.inject(MainService) as jasmine.SpyObj<MainService>
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    

    component.registerFrom = component.registerFromBuilder.group({
      f_name: ['Vikash'],
      l_name: ['Babu'],
      register_email: ['vikas6@gmail.com'],
      age: ['29'],
      register_password: ['Vikash@123'],
    });
    fixture.detectChanges();

   
  });


 it('should call API and navigate to home screen ' , ()=> {

  const mockResponse = { status : true }

  service.postData.and.returnValue(of(mockResponse))

  component.validation()

  expect(service.postData).toHaveBeenCalledWith(
    component.registerFrom.value,'/user/register'
  )

 })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
