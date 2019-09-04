import { Component, Input } from '@angular/core';
//import { tileLayer, latLng, marker, icon, MapOptions, Marker, Map } from 'leaflet';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

declare const L: any;
import 'leaflet';
import 'leaflet-search';
import '@ansur/leaflet-pulse-icon'





@Component({
  selector: 'gd-showmap',
  templateUrl: './showmap.component.html',
  styleUrls: ['./showmap.component.sass']
})



export class ShowMapComponent {

  @Input() zoom: number;
  @Input() venues: VenueDetails[];
  protected map: L.Map;
  protected mapOptions: L.MapOptions;
  //protected venues: VenueDetails[];
  protected layers: L.Marker[];
  //protected leafletOptions: L.ControlOptions;
  protected markersLayer: L.LayerGroup;



  constructor(protected data: DataService, private sanitizer: DomSanitizer) {}


ngOnInit() {

  console.log(this.venues);

    this.mapOptions = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18, attribution: '...' })],
      zoom: this.zoom,
      center: L.latLng(20, 20)

    };



      const bears = [ 'bear_blue_100.png', 'bear_blue_100a.png', 'bear_green_100.png',
                    'bear_green_100a.png', 'bear_orange_100.png', 'bear_orange_100a.png',
                    'bear_pink_100.png', 'bear_pink_100a.png', 'bear_yellow_100.png',
                    'bear_yellow_100a.png' ]

    var l = []
    this.venues.forEach(v => {
      if (v.long != undefined) {
        const venuehtml = this.venueHtml(v.shows);
        var datestring = "<br>";
        var c = 0;
        v.shows.forEach((e: {date: string}) => {
          c += 1;
          datestring = datestring +  e.date ;
          if (c % 3 == 0) { datestring += "<br>"; }
          else { datestring += " "; }
        });
        var bear = bears[Math.floor(Math.random()*bears.length)];
        var m = L.marker([v.long, v.lat], {
          title: v.name + datestring,
          alt: "hello",
          riseOnHover: true,
          pane: 'overlayPane',
          icon: L.icon({
            iconSize: [ null, 20 ],
            iconAnchor: [ 9, 19 ],
            iconUrl: 'assets/' + bear //bearmap.png',
        })
      }).bindPopup('<b> <a href="/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml);
      }
      l.push(m)

    });
    this.layers = l;
    this.markersLayer = new L.LayerGroup(this.layers);

    }


onMapReady(map: L.Map) {

  this.map = map;

  //console.log(this.map);
  console.log(this.markersLayer)
  const pulsingIcon = L.icon.pulse({iconSize:[10,10], color:'blue'});
  const searchMarker = L.marker([0, 0],{icon: pulsingIcon, pane: 'markerPane' });
  this.map.addControl( new L.Control.Search({layer: this.markersLayer, initial: false, marker: searchMarker }) ); // filterData: (text, records) => records[0] }
  

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
