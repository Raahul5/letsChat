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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginFormbuilder: FormBuilder, private apiservice: MainService, private snackBar: MatSnackBar, private router:Router) {}

  
  ngOnInit(): void {

    this.loginForm = this.loginFormbuilder.group({
      login_email: new FormControl('', [Validators.required, Validators.email] ),
      login_password : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
    })

  }

  validation(){
  
if(this.loginForm.valid){
  console.log(this.loginForm.value.login_email)
  this.apiservice.login(this.loginForm.value, '/user/login').subscribe((response)=>{
    if (response.status) {
      console.log(response)
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
