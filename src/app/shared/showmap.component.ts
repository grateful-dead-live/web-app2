import { Component, Input } from '@angular/core';
//import { tileLayer, latLng, marker, icon, MapOptions, Marker, Map } from 'leaflet';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as Fuse from 'fuse.js';

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
  protected layers: L.Marker[];
  protected markersLayer: L.LayerGroup;
  protected markerDates: any = {};
  protected fuse: any;
  
  constructor(protected data: DataService, private sanitizer: DomSanitizer) {}

ngOnInit() {


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

    var l = [];
    var fuseList = []
    this.venues.forEach(v => {
      if (v.long != undefined) {
        var fuseItem = { title: v.name };
        var dates = ""
        v.shows.forEach(e  => { 
          dates += e["date"] + " " 
        });
        fuseItem["dates"] = dates;
        fuseList.push(fuseItem);
    
        const venuehtml = this.venueHtml(v.shows);
        var bear = bears[Math.floor(Math.random()*bears.length)];
        var m = L.marker([v.long, v.lat], {
        title: v.name,
        riseOnHover: true,
        pane: 'overlayPane',
          icon: L.icon({
            iconSize: [ null, 22 ],
            iconAnchor: [ 10, 21 ],
            iconUrl: 'assets/' + bear
          })
        }).bindPopup('<b> <a href="/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml);
        l.push(m)   
      }
    });

    this.layers = l;
    

    var fuseOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "dates"
      ]
    };
    this.fuse = new Fuse(fuseList, fuseOptions );
    this.markersLayer = new L.LayerGroup(this.layers);
}


onMapReady(map: L.Map) {
  this.map = map;
  const pulsingIcon = L.icon.pulse({iconSize:[10,10], color:'blue'});
  const searchMarker = L.marker([0, 0],{icon: pulsingIcon, pane: 'markerPane' });
  this.map.addControl( new L.Control.Search({layer: this.markersLayer, initial: false, marker: searchMarker, 
                      filterData: (text, records) => this.searchMarkers(text, records) }) ); 
  
}

searchMarkers(text, records){
  var res = {};
  this.fuse.search(text).forEach(e => {
    res[e.title] = records[e.title];
  })
  return res
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
