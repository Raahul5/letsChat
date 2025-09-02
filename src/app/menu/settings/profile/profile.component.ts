import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store'
import {SelectUserName} from '../../../store/selectors/post.selector'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userName$:Observable<string|null>
  constructor( 
    public profileFormbuilder:FormBuilder,
    private store: Store){
      this.userName$ = store.select(SelectUserName)
  
  }

  
profileFormGroup : FormGroup
origialData:any[]=[1,2,3,4,5]
ngOnInit(): void {
this.userName$.subscribe((value)=>console.log(value))
  this.profileFormGroup = this.profileFormbuilder.group({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
}
}
