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
import { PlaylistComponent } from './views/playlist.component';
import { IndexComponent } from './views/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/mapselect', pathMatch: 'full' },
  //{ path: '', component: MapSelectComponent, resolve: { loggedIn: APIResolver} },
  { path: 'show', component: ShowComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'location', component: LocationComponent },
  { path: 'location/:id', component: LocationComponent },
  { path: 'venue', component: VenueComponent },
  { path: 'venue/:id', component: VenueComponent },
  { path: 'song', component: SongComponent },
  { path: 'song/:id', component: SongComponent },
  { path: 'recording', component: RecordingComponent },
  { path: 'recording/:id', component: RecordingComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'artifacts', component: ArtifactsComponent },
  { path: 'artifacts/:types', component: ArtifactsComponent },
  { path: 'mapselect', component: MapSelectComponent },
  { path: 'about', component: StartComponent },
  { path: 'profile', component: ProfileComponent, resolve: { loggedIn: APIResolver} },
  { path: 'comments', component: CommentsComponent },
  { path: 'dataprivacy', component: PrivacyPolicyComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
