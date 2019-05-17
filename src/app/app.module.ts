import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './views/show.component';
import { LocationComponent } from './views/location.component';
import { VenueComponent } from './views/venue.component';

import { HeaderComponent } from './shared/header.component';
import { MapComponent } from './shared/map.component';
import { ShowsComponent } from './shared/shows.component';

import { DeadApiService } from './services/dead-api.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    LocationComponent,
    VenueComponent,
    HeaderComponent,
    MapComponent,
    ShowsComponent
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
