import { Component } from '@angular/core';
import {MainService} from '../app/main.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jovial';
  constructor(private apiservice:MainService){}

  logout(){
this.apiservice.logout()
  }
}
