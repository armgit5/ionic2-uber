import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PickupPubSub } from '../../providers/pickup-pub-sub';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PickupPubSub]
})
export class HomePage {

  public isPickupRequested: boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;

  constructor(public navCtrl: NavController,
              public pickupPubSub: PickupPubSub) {
    this.isPickupRequested = false;
    this.timeTillArrival = 5;
    this.pickupSubscription= this.pickupPubSub.watch().subscribe(e => {
      this.processPickupSubscription(e);
    });
  }

  processPickupSubscription(e) {
    switch(e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
    }
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }

  confirmPickup() {
    this.isPickupRequested = true;
  }

  cancelPickup() {
    this.isPickupRequested = false;
  }

}
