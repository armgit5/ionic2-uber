import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car';
import SlidingMarker from 'marker-animate-unobtrusive';
/*
  Generated class for the AvailableCars component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;
  
  constructor(public carService: CarService) {
    this.carMarkers = [];
  }

  ngOnInit() {
    this.fetchAndRefreshCars();
  }

  ngOnChanges(changes) {
    if (this.isPickupRequested) {
      this.removeCarMarkers();
    }
  }

  removeCarMarkers() {
    let numOfCars = this.carMarkers.length;
    while(numOfCars--) {
      let car = this.carMarkers.pop();
      car.setMap(null);
    }
  }

  addCarMarker(car) {
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car.png'
    });

    carMarker.setDuration(3000);
    carMarker.setEasing('linear');

    carMarker.set('id', car.id);

    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car) {
    
    var numOfCars = this.carMarkers.length;
    for (var i=0; i < numOfCars; i++) {
      if (this.carMarkers[i].get('id') === car.id) {
        if (car) {
          this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        }
        
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
