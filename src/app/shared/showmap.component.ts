import { Component, Input } from '@angular/core';
import { tileLayer, latLng, marker, icon, MapOptions, Marker } from 'leaflet';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as L from 'leaflet';

@Component({
  selector: 'gd-showmap',
  templateUrl: './showmap.component.html',
  styleUrls: ['./showmap.component.sass']
})
export class ShowMapComponent {
  
  @Input() zoom: number;
  //@Input() venues: VenueDetails[];
  protected options: MapOptions;
  protected venues: VenueDetails[];
  protected layers: Marker[];

  
  constructor(private data: DataService, private sanitizer: DomSanitizer) {}
  

async ngOnInit() {
  
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18, attribution: '...' })],
      zoom: this.zoom,
      center: latLng(20, 20)
    };

    this.venues = await this.data.getVenueCoordinates();

    var l = [];
    this.venues.forEach(v => {
      var m = marker([v.long, v.lat], {
        riseOnHover: true,
        icon: icon({
          iconSize: [ 15, 23 ],
          iconAnchor: [ 8, 22 ],
          iconUrl: 'assets/bearmap.png',
        })
      }).bindPopup('<b> <a href="/venue/' + v.id + '">' + v.name + '</a></b>');
      l.push(m)      
    });
    this.layers = l;
    }

onClick(e){
  console.log(e)
}
    

}

