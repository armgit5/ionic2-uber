import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Simulate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimulateService {

  constructor(public http: Http) {

  }

  getCars(lat, lng) {

    let carData = this.cars[this.carIndex];
    this.carIndex++;

    if (this.carIndex > this.cars.length-1) {
      this.carIndex = 0;
    }

    return Observable.create(
      observer => observer.next(carData)
    );
  }

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.679531, 
        lng: 100.723645
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.678569, 
        lng: 100.713945
      }
    }]
  };

  private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.680840, 
        lng: 100.724414
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.680963, 
        lng: 100.715348
      }
    }]
  };

  private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.682191, 
        lng: 100.720843
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.679054, 
        lng: 100.718437 
      }
    }]
  };

  private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.683770, 
        lng: 100.715562
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.678387, 
        lng: 100.723367 
      }
    }]
  };

  private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 13.682378, 
        lng: 100.712162
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.680239, 
        lng: 100.724161
      }
    }]
  };

  private carIndex: number = 0;

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];
}
