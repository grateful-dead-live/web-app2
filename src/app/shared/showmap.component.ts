import { Component, Input } from '@angular/core';
import { tileLayer, latLng, marker, icon, MapOptions, Marker, Map, Control } from 'leaflet';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';




@Component({
  selector: 'gd-showmap',
  templateUrl: './showmap.component.html',
  styleUrls: ['./showmap.component.sass']
})
export class ShowMapComponent {
  
  @Input() zoom: number;
  //@Input() venues: VenueDetails[];
  protected map: Map;
  protected mapOptions: MapOptions;
  protected venues: VenueDetails[];
  protected layers: Marker[];
  protected search: Control;
  

  constructor(private data: DataService, private sanitizer: DomSanitizer) {}
  

async ngOnInit() {
  
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18, attribution: '...' })],
      zoom: this.zoom,
      center: latLng(20, 20)
      
    };

    
    this.venues = await this.data.getVenueCoordinates();

    var l = [];
    this.venues.forEach(v => {
      if (v.long != undefined) {
        const venuehtml = this.venueHtml(v.shows);
        var m = marker([v.long, v.lat], {
          riseOnHover: true,
          icon: icon({
            iconSize: [ 15, 23 ],
            iconAnchor: [ 8, 22 ],
            iconUrl: 'assets/bearmap.png',
        })
      }).bindPopup('<b> <a href="/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml);
      l.push(m) }   
    });
    this.layers = l;

    //console.log(this.map);



    

    }
    

onMapReady(map: Map) {  
  this.map = map;
}

venueHtml(s) {
  if (s != undefined){
    var htmlstring = '<br>';
    s.forEach(e => {
      htmlstring += '<a href="/show/' + e.id + '">' + e.date + '</a><br>' ;
    }); 
  return htmlstring;
}}






}

