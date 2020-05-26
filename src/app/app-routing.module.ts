import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './views/show.component';
import { LocationComponent } from './views/location.component';
import { VenueComponent } from './views/venue.component';
import { SongComponent } from './views/song.component';
import { RecordingComponent } from './views/recording.component';
import { ArtistComponent } from './views/artist.component';
import { ArtifactsComponent } from './views/artifacts.component';
import { MapSelectComponent } from './views/mapselect.component';
import { StartComponent } from './views/start.component';
import { ProfileComponent } from './profile/profile.component';
import { APIResolver } from './auth.resolve';
import { CommentsComponent } from './comments/comments.component';
import { PrivacyPolicyComponent } from './cookie-banner/privacy-policy.component';

const routes: Routes = [
  { path: '', redirectTo: '/mapselect', pathMatch: 'full' },
  //{ path: '', component: MapSelectComponent, resolve: { loggedIn: APIResolver} },
  { path: 'show', component: ShowComponent, resolve: { loggedIn: APIResolver} },
  { path: 'show/:id', component: ShowComponent, resolve: { loggedIn: APIResolver} },
  { path: 'location', component: LocationComponent, resolve: { loggedIn: APIResolver} },
  { path: 'location/:id', component: LocationComponent, resolve: { loggedIn: APIResolver} },
  { path: 'venue', component: VenueComponent, resolve: { loggedIn: APIResolver} },
  { path: 'venue/:id', component: VenueComponent, resolve: { loggedIn: APIResolver} },
  { path: 'song', component: SongComponent, resolve: { loggedIn: APIResolver} },
  { path: 'song/:id', component: SongComponent, resolve: { loggedIn: APIResolver} },
  { path: 'recording', component: RecordingComponent, resolve: { loggedIn: APIResolver} },
  { path: 'recording/:id', component: RecordingComponent, resolve: { loggedIn: APIResolver} },
  { path: 'artist', component: ArtistComponent, resolve: { loggedIn: APIResolver} },
  { path: 'artist/:id', component: ArtistComponent, resolve: { loggedIn: APIResolver} },
  { path: 'artifacts', component: ArtifactsComponent, resolve: { loggedIn: APIResolver} },
  { path: 'artifacts/:types', component: ArtifactsComponent, resolve: { loggedIn: APIResolver} },
  { path: 'mapselect', component: MapSelectComponent, resolve: { loggedIn: APIResolver} },
  { path: 'about', component: StartComponent, resolve: { loggedIn: APIResolver} },
  { path: 'profile', component: ProfileComponent, resolve: { loggedIn: APIResolver} },
  { path: 'comments', component: CommentsComponent, resolve: { loggedIn: APIResolver} },
  { path: 'dataprivacy', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
