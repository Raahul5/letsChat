import { Component, OnInit } from '@angular/core';
import {MainService} from '../app/main.service'
import { Store } from '@ngrx/store';
import * as user from './store/action/post.action'
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jovial';
  constructor(private apiservice:MainService, private store: Store){}
public userid=1234;
currentDate = new Date();
ngOnInit(): void {
 if(this.apiservice.loggedIn) {

var token = localStorage.getItem('access_token')
if (token) {
  const decodedToken : any = jwtDecode(token);

  this.store.dispatch(user.setUserID({id:decodedToken.id}))
} else {
  console.error('No access token found in localStorage');
}
 
 }else{

  console.log(false)
 }
}
  logout(){
this.apiservice.logout()
  }
}
