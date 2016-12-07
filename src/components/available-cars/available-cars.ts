import { Component, Input, OnInit } from '@angular/core';
import { CarService } from '../../providers/car';

/*
  Generated class for the AvailableCars component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html',
  providers: [CarService]
})
export class AvailableCarsComponent implements OnInit {

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;
  
  constructor(public carService: CarService) {
    this.carMarkers = [];
  }

  ngOnInit() {
    this.fetchAndRefreshCars();
  }

  addCarMarker(car) {
    let carMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car.png'
    });

    carMarker.set('id', car.id);

    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car) {
    
    var numOfCars = this.carMarkers.length;
    for (var i=0; i < numOfCars; i++) {
      if (this.carMarkers[i].get('id') === car.id) {
        
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
    }
    this.addCarMarker(car);
  }

  fetchAndRefreshCars() {
    this.carService.getCars(9,9)
    .subscribe(carsData => {
      if (!this.isPickupRequested) {
        (<any>carsData).cars.forEach(car => {
          this.updateCarMarker(car);
          // console.log(car);
        });
      }
    });
  }

}
