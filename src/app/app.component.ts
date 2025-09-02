import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MainService } from '../app/main.service'
import { Store } from '@ngrx/store';
import * as user from './store/action/post.action'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jovial';
  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object,
   private readonly apiservice: MainService, 
   private readonly store: Store,
  private readonly router:Router) { }

  ngOnInit(): void {
    
    const userid = this.apiservice.getUserId();
    if (userid) {
      this.store.dispatch(user.setUserID({ id: userid }))
    }
  }

  logout() {
    this.apiservice.logout()
    this.router.navigate(['/login'])
    
  }
}
