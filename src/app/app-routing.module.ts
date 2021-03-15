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

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  //{ path: '', component: MapSelectComponent, resolve: { loggedIn: APIResolver} },
  { path: 'show', component: ShowComponent, canActivate : [AuthGuard] },
  { path: 'show/:id', component: ShowComponent, canActivate : [AuthGuard] },
  { path: 'location', component: LocationComponent, canActivate : [AuthGuard] },
  { path: 'location/:id', component: LocationComponent, canActivate : [AuthGuard] },
  { path: 'venue', component: VenueComponent, canActivate : [AuthGuard] },
  { path: 'venue/:id', component: VenueComponent, canActivate : [AuthGuard] },
  { path: 'song', component: SongComponent, canActivate : [AuthGuard] },
  { path: 'song/:id', component: SongComponent, canActivate : [AuthGuard] },
  { path: 'recording', component: RecordingComponent, canActivate : [AuthGuard] },
  { path: 'recording/:id', component: RecordingComponent, canActivate : [AuthGuard] },
  { path: 'artist', component: ArtistComponent, canActivate : [AuthGuard] },
  { path: 'artist/:id', component: ArtistComponent, canActivate : [AuthGuard] },
  { path: 'artifacts', component: ArtifactsComponent, canActivate : [AuthGuard] },
  { path: 'artifacts/:types', component: ArtifactsComponent, canActivate : [AuthGuard] },
  { path: 'mapselect', component: MapSelectComponent, canActivate : [AuthGuard] },
  { path: 'about', component: StartComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard], resolve: { loggedIn: APIResolver} },
  //{ path: 'comments', component: CommentsComponent },
  { path: 'dataprivacy', component: PrivacyPolicyComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'index', component: IndexComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
