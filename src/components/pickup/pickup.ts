import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { PickupPubSub } from '../../providers/pickup-pub-sub';


/*
  Generated class for the Pickup component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnChanges, OnInit {

  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Output() updatedPickupLocation: EventEmitter<any> = new EventEmitter();

  private pickupMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;
  private pickupSubscription: any;

  constructor(private pickupPubSub: PickupPubSub) {
   
  }

  ngOnInit() {
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      this.updateTime(e.data);
    });
  }

  updateTime(seconds) {
    let minutes = Math.floor(seconds/60);
    if (this.isPickupRequested) {
      this.popup.setContent(`<h5>${minutes}</h5> minutes`);
    }
    
  }

  ngOnChanges(changes) {
    if (!this.isPickupRequested) {
       if (this.isPinSet) {
          this.showPickupMarker();
        } else {
          this.removePickupMarker();
        }
    } 
   
  }

  showPickupMarker() {

    this.removePickupMarker();

    console.log('show marker');
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: 'img/pin.png'
    });

    setTimeout(() => {
      if (this.pickupMarker) {
        this.pickupMarker.setAnimation(null);
      }
    }, 750);

    this.showPickupTime();

    //send pickup location
    this.updatedPickupLocation.emit(this.pickupMarker.getPosition());
  }

  removePickupMarker() {
    console.log('removeing');
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
  }

  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5>You are here</h5>'
    });

    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    });
  }

}
