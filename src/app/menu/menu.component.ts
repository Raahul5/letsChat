import { Component } from '@angular/core';
import {MainService} from '../main.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  title = 'jovial';
  constructor(private apiservice:MainService){}
public userid=1234;
currentDate = new Date();
  logout(){
this.apiservice.logout()
  }
}
