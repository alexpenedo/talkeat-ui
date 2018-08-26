import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeolocationService} from './services/geolocation/geolocation.service';
import {MapComponent} from './components/map/map.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZdKZkDWl-ek6SDeqwfJtbZT3QiNrfVn4',
      libraries: ['places'],
      language: 'es',
      region: 'ES'
    }),
    AgmJsMarkerClustererModule,
  ],
  providers: [GeolocationService],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class MapModule {
}
