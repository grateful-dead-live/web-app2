import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowComponent } from './views/show.component';
import { LocationComponent } from './views/location.component';
import { VenueComponent } from './views/venue.component';
import { SongComponent } from './views/song.component';
import { RecordingComponent } from './views/recording.component';
import { ArtistComponent } from './views/artist.component';
import { ArtifactsComponent } from './views/artifacts.component';
import { MapSelectComponent} from './views/mapselect.component';
import { StartComponent} from './views/start.component';


import { HeaderComponent } from './shared/header.component';
import { MapComponent } from './shared/map.component';
import { WeatherComponent } from './shared/weather.component';
import { ShowsComponent } from './shared/shows.component';
import { PlayerComponent } from './shared/player.component';
import { ListDialogComponent } from './shared/list-dialog.component';
import { SearchDialogComponent } from './shared/search-dialog.component';
import { ShowMapComponent } from './shared/showmap.component';

import { DeadApiService } from './services/dead-api.service';
import { DataService } from './services/data.service';
import { PlayerService } from './services/player.service';
import { DialogService } from './services/dialog.service';

//import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
//import { ButtonDirective } from './button.directive';
import { ProfileComponent } from './profile/profile.component';

import { APIResolver } from './auth.resolve';
//import { ChatterBoxModule } from './chatter-box';
import { CommentsComponent } from './comments/comments.component';
import { InputDialogComponent } from './shared/input-dialog.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { PrivacyPolicyComponent } from './cookie-banner/privacy-policy.component';
import {GoogleAnalyticsService} from './services/google-analytics.service';

import { ShareButtonsComponent } from './shared/sharebuttons.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { ChatterBoxComponent } from './comments/chatter-box.component';
import { PlaylistComponent } from './views/playlist.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeComponent } from './shared/youtube.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { LightboxModule } from 'ngx-lightbox';
import { LightboxService } from './services/lightbox.service'


@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    LocationComponent,
    VenueComponent,
    SongComponent,
    RecordingComponent,
    ArtistComponent,
    ArtifactsComponent,
    HeaderComponent,
    MapComponent,
    WeatherComponent,
    ShowsComponent,
    PlayerComponent,
    ListDialogComponent,
    SearchDialogComponent,
    ShowMapComponent,
    MapSelectComponent,
    StartComponent,
    //ButtonDirective,
    ProfileComponent,
    CommentsComponent,
    InputDialogComponent,
    CookieBannerComponent,
    PrivacyPolicyComponent,
    ShareButtonsComponent,
    ChatterBoxComponent,
    PlaylistComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    LazyLoadImageModule,
    LeafletModule.forRoot(),
    MatSliderModule,
    MatProgressSpinnerModule,
    //ChatterBoxModule,
    ShareButtonsModule,
    ShareIconsModule,
    YouTubePlayerModule,
    NgSelectModule,
    Ng2CarouselamosModule,
    LightboxModule
  ],
  providers: [
    DeadApiService,
    DataService,
    PlayerService,
    DialogService,
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    APIResolver,
    {
      provide: 'window',
      useValue: window,
    },
    {
      provide: 'document',
      useValue: document,
    },
    GoogleAnalyticsService,
    LightboxService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListDialogComponent, SearchDialogComponent, InputDialogComponent], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
