import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AgmCoreModule } from '@agm/core';
// Leaflet Map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { UIModule } from '../../shared/ui/ui.module';

import { MapsRoutingModule } from './maps-routing.module';
import { GoogleComponent } from './google/google.component';
import { LeafletComponent } from './leaflet/leaflet.component';

@NgModule({
  declarations: [GoogleComponent, LeafletComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    UIModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    // }),
    LeafletModule
  ]
})
export class MapsModule { }
