import { Component, OnInit, Input, Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {Observable} from 'rxjs/Rx';
import { CarService } from '../../providers/car';

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'map.html',
  providers: [CarService]
})

@Injectable()
export class MapComponent implements OnInit {

  text: string;
  public map;
  public isMapIdle: boolean;
  public currentLocation: google.maps.LatLng;

  @Input() isPickupRequested: boolean;

  constructor(private loadingCtrl: LoadingController) {
   
  }

  ngOnInit() {
    this.map = this.createMap();
    this.addMapEventListeners();
    this.isMapIdle = false;
    console.log(this.isMapIdle);

    this.getCurrentLocation().subscribe(
      location => {
        this.centerLocation(location);
      }
    )
  }

  updatedPickupLocation(location) {
    
    // this.currentLocation = new google.maps.LatLng(location.lat, location.lng);
    

    this.currentLocation = location;
    // this.centerLocation(this.currentLocation);
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
      // console.log('dragging');
    });
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
      // console.log('idle');
    });
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    } else {
      this.getCurrentLocation().subscribe(
        currentLocation => {
          this.map.panTo(currentLocation);
        }
      );
    }
    this.isMapIdle = false;
  }

  getCurrentLocation(): Observable<any> {

    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });

    loading.present();
    
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options)
      .then(
        resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;

          let location = new google.maps.LatLng(lat, lng);
          observable.next(location);
          loading.dismiss();
        },
        err => {
          console.log(err); 
          loading.dismiss();
        }
      );
    }
    );

    return locationObs;

    
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
