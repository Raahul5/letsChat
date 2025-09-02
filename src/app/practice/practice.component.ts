import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sample } from '../store/model/storeSampleData.model';
import { selectSampleData, SelectSampleState } from '../store/selectors/post.selector';
import { sampleState } from '../store/reducers/sample.reducers';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent implements OnInit {
isSuccess:boolean;
sample$:Observable<sample[]>
constructor(private store:Store<sampleState>){
  this.sample$ = this.store.pipe(select(selectSampleData))
}
ngOnInit(): void {
}
changeColor(){
  this.isSuccess = !this.isSuccess
  console.log(this.isSuccess)
   this.sample$.subscribe(res => console.log(res))

}

}
