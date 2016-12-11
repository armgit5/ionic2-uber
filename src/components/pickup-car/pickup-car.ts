import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CarService } from '../../providers/car';
import SlidingMarker from 'marker-animate-unobtrusive';
import { PickupPubSub } from '../../providers/pickup-pub-sub';

/*
  Generated class for the PickupCar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickupLocation: google.maps.LatLng;

  public pickupCarMarker: any;
  public polylinePath: google.maps.Polyline;

  constructor(public carService: CarService,
              private pickupPubSub: PickupPubSub) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (this.isPickupRequested) {
      this.requestCar();
    } else {
      this.removeCar();
      this.removeDirections();
    }
  }

  addCarMarker(position) {
    this.pickupCarMarker = new SlidingMarker({
      map: this.map,
      position: position,
      icon: 'img/car.png'
    });

    this.pickupCarMarker.setDuration(1000);
    this.pickupCarMarker.setEasing('linear');
  }

  showDirections(path) {
    this.polylinePath = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });

    this.polylinePath.setMap(this.map);
  }

  updateCar() {
    this.carService.getPickupCar().subscribe(car => {
      // console.log('car posi ' + car.position);
      if (car) {
        this.pickupCarMarker.setPosition(car.position);
        this.polylinePath.setPath(car.path);
        // console.log(car.time);
        this.pickupPubSub.emitArrivalTime(car.time);
      }
      
      if (car.path.length > 1) {
        setTimeout(() => {
          this.updateCar();
        }, 1000);
      } else {

      }
    });

    
  }

  requestCar() {

    console.log('request car ' + this.pickupLocation);

    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        console.log('requestCar');
        //show car marker 
        // console.log(car.position);
        this.addCarMarker(car.position);
        //show car path
        this.showDirections(car.path);
        //keep updating car
        this.updateCar();
      });
  }

  removeCar() {
    if (this.pickupCarMarker) {
      this.pickupCarMarker.setMap(null); 
      // this.pickupCarMarker = null;
    }
  }

  removeDirections() {
    if (this.polylinePath) {
      this.polylinePath.setMap(null);
      // this.polylinePath = null;
    }
  }

}
