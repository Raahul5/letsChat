import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.css'
})


export class SampleComponent {
  @Input() sendData:string
  @Output() respondData = new EventEmitter<string>
  toParent:string
  sendToParent(){
   
    this.respondData.emit(this.toParent)
  }
}
