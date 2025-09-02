import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { confrimPasswordMaatching } from '../validations';
import { MainService } from '../main.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import {selectPost} from '../store/selectors/post.selector'
import {Post} from '../store/model/post.model'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostState } from '../store/reducers/post.reducers';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatCardModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  post$:Observable<Post[]>


  constructor(
    public registerFromBuilder: FormBuilder,
    private readonly apiservice: MainService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
   
    private readonly store:Store<PostState>
  ) { 
    this.post$= this.store.pipe(select(selectPost))
  }



  registerFrom: FormGroup;
  age_pattern: string = '';
  islogged: boolean = false


  ngOnInit(): void {

    this.post$.subscribe(posts => {
      console.log("Selector post", posts);
    });
    // this.islogged = this.apiservice.loggedIn
    // if (!this.islogged) {
    //   this.router.navigate(['/login']);
    // }
    this.registerFrom = this.registerFromBuilder.group({
      f_name: new FormControl('', Validators.required),
      l_name: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(1[89]|[2-9]\d)$/),
      ]),
      register_email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      register_password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),
      register_CONpassword: new FormControl('', [
        Validators.required,
        confrimPasswordMaatching('register_password', 'register_CONpassword'),
      ]),
    });
  }

  validation() {
    if (this.registerFrom.valid) {

      let obj = {
        firstname:this.registerFrom.value.f_name,
        lastname:this.registerFrom.value.l_name,
        age:this.registerFrom.value.age,
        email:this.registerFrom.value.register_email,
        password:this.registerFrom.value.register_CONpassword
      }
      console.log(obj)
      this.apiservice
        .postData(obj, '/user/register')
        .subscribe((response) => {

          if (response.status) {
            console.log(response)
            this.snackBar.open('Registered Successfully', 'close', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            })

            this.router.navigate([''])
          }
          else {
            console.log(response)
            this.router.navigate(['/login'])
          }
        });
    }
  }
}
