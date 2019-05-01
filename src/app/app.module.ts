import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './views/show.component';
import { VenueComponent } from './views/venue.component';

import { DeadApiService } from './dead-api.service';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    VenueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [DeadApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
