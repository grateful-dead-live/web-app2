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
    const bears = [ 'bear_blue_100.png', 'bear_blue_100a.png', 'bear_green_100.png', 
                    'bear_green_100a.png', 'bear_orange_100.png', 'bear_orange_100a.png', 
                    'bear_pink_100.png', 'bear_pink_100a.png', 'bear_yellow_100.png',
                    'bear_yellow_100a.png' ]

    var l = [];
    this.venues.forEach(v => {
      if (v.long != undefined) {
        const venuehtml = this.venueHtml(v.shows);
        var bear = bears[Math.floor(Math.random()*bears.length)];
        var m = marker([v.long, v.lat], {
          riseOnHover: true,
          icon: icon({
            iconSize: [ null, 20 ],
            iconAnchor: [ 9, 19 ],
            iconUrl: 'assets/' + bear //bearmap.png',
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

