import { Component , OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MainService} from '../main.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as user from '../store/action/post.action'
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly loginFormbuilder: FormBuilder, 
    private readonly apiservice: MainService, 
    private readonly snackBar: MatSnackBar, 
    private readonly router:Router,
    private readonly store:Store

 ) {
    
    }

  
  ngOnInit(): void {
   
    this.loginForm = this.loginFormbuilder.group({
      login_email: new FormControl('', [Validators.required, Validators.email] ),
      login_password : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
    })

  }

  validation(){
  
if(this.loginForm.valid){
 let obj={
  email : this.loginForm.value.login_email,
  password:this.loginForm.value.login_password
 }
  this.apiservice.login(obj, '/user/login').subscribe((response)=>{
    if (response.status) {
      
      localStorage.setItem("token",response.data);
      const decodedToken : any = jwtDecode(response.data);
     
      localStorage.setItem("role",decodedToken.role)
      this.store.dispatch(user.setUserID({id:decodedToken.sub}))

      
      this.snackBar.open('Login Successfully','close',{
      duration: 5000, 
      horizontalPosition: 'right', 
      verticalPosition: 'top', 
    })

      this.router.navigate([''])
    }
    else{
      console.log(response)
      this.router.navigate(['/register'])
    }
  })
}
    

   
  }

}
