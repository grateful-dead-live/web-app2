import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './views/show.component';
import { LocationComponent } from './views/location.component';
import { VenueComponent } from './views/venue.component';
import { SongComponent } from './views/song.component';
import { ArtistComponent } from './views/artist.component';
import { ArtifactsComponent } from './views/artifacts.component';
import { MapSelectComponent } from './views/mapselect.component';

const routes: Routes = [
  { path: '', redirectTo: '/show', pathMatch: 'full' },
  { path: 'show', component: ShowComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'location', component: LocationComponent },
  { path: 'location/:id', component: LocationComponent },
  { path: 'venue', component: VenueComponent },
  { path: 'venue/:id', component: VenueComponent },
  { path: 'song', component: SongComponent },
  { path: 'song/:id', component: SongComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'artifacts', component: ArtifactsComponent },
  { path: 'artifacts/:types', component: ArtifactsComponent },
  { path: 'mapselect', component: MapSelectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
