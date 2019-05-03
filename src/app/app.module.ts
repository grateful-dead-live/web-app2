import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './views/show.component';
import { VenueComponent } from './views/venue.component';
import { MapComponent } from './shared/map.component';

import { DeadApiService } from './dead-api.service';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    VenueComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    LeafletModule.forRoot()
  ],
  providers: [DeadApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
