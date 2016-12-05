import { Component, OnInit, Input } from '@angular/core';

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {

  text: string;
  public map;

  @Input() isPickupRequested: boolean;

  constructor() {
    console.log('Hello Map Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.map = this.createMap();
  }

  createMap(location = new google.maps.LatLng(40.712784, -74.005941)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);
    return map;
  }


}
