import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapComponent } from '../components/map/map';
import { PickupComponent } from '../components/pickup/pickup';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { PickupCarComponent } from '../components/pickup-car/pickup-car';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
