import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { confrimPasswordMaatching } from '../validations';
import { MainService } from '../main.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {selectPost, selectPostState} from '../store/selectors/post.selector'
import {post} from '../store/model/post.model'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { postState } from '../store/reducers/post.reducers';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  post$:Observable<post[]>


  constructor(
    private registerFromBuilder: FormBuilder,
    private apiservice: MainService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route : ActivatedRoute,
    private store:Store<postState>
  ) { 
    this.post$= this.store.pipe(select(selectPost))
  }



  registerFrom: FormGroup;
  age_pattern: String = '';
  islogged: boolean = false


  ngOnInit(): void {
console.log(this.route.snapshot.paramMap.get('id'));
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
      this.apiservice
        .postData(this.registerFrom.value, '/user/register')
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
