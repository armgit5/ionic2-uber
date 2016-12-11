import { Component, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the DestinationAddress component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'destination-address',
  templateUrl: 'destination-address.html'
})
export class DestinationAddressComponent {

  @Output() newDest: EventEmitter<any> = new EventEmitter();

  constructor() {
    
  }

}
