import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { SimulateService } from './simulate';

/*
  Generated class for the Car provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarService {

  public simulate: SimulateService;

  constructor(public http: Http) {
    this.simulate = new SimulateService(http);
  }

  getCars(lat, lng) {
    return Observable
          .interval(2000)
          .switchMap(() => this.simulate.getCars(lat, lng))
          .share();
  }

  findPickupCar(pickupLocation) {
    return this.simulate.findPickupCar(pickupLocation);
  }

  getPickupCar() {
    return this.simulate.getPickupCar();
  }

}
