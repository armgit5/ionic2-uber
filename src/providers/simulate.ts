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

  public directionsService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor(public http: Http) {
    this.directionsService = new google.maps.DirectionsService();
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

  calculateRoute(start, end) {
    return Observable.create(observable => {
      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          observable.next(response);
        } else {
          observable.next(status);
        }
      });
    });
  }

  getSegmentedDirection(directions) {
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0;

    // console.log('getsegment');

    let numOfLegs = legs.length;
    // console.log('legs '+ legs);
    // console.log('numOfLegs '+ numOfLegs);
    while (numOfLegs--) {
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;

      // console.log('numOfSteps '+ numOfSteps);
      while (numOfSteps--) {
        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoints = points.length;
        // console.log('numOfPoint '+ numOfPoints);
        duration += step.duration.value;

        while(numOfPoints--) {
          let point = points[numOfPoints];
          // console.log('point'+point);
          path.push(point);

          increments.unshift({
            position: point,
            time: duration,
            path: path.slice(0)
          });
        }
      }
    } 

    return increments;
  }

  getPickupCar() {
    return Observable.create(observable => {
      let car = this.myRoute[this.myRouteIndex];

      observable.next(car);
      this.myRouteIndex++;

    });
  }

  simulateRoute(start, end) {
    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        this.myRoute = this.getSegmentedDirection(directions);
        this.getPickupCar().subscribe(car => {
          observable.next(car);
        });
      });
    });
  }

  findPickupCar(pickupLocation) {

    this.myRouteIndex = 0;

    let car = this.cars1.cars[0];
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = pickupLocation;

    return this.simulateRoute(start, end);
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
