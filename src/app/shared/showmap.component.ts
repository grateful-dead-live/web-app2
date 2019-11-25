import { Component, Input } from '@angular/core';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
//import * as Fuse from 'fuse.js'; // imported in angular.json
import * as _ from 'lodash';

declare const L: any;
import 'leaflet';
import '../../leaflet-fusesearch/src/leaflet.fusesearch.js'
import 'leaflet-polylinedecorator'


@Component({
  selector: 'gd-showmap',
  templateUrl: './showmap.component.html',
  styleUrls: ['./showmap.component.sass']
})


export class ShowMapComponent {
  @Input() zoom: number;
  //@Input() venues: VenueDetails[];
  protected venues: VenueDetails[];
  protected mapOptions: L.MapOptions;
  protected map: L.Map;
  protected selectLayers: {};
  protected layerNames: string[];
  protected searchCtrl: any;
  protected geoJsons: {};
  protected currentLayer: string;
  protected selectedTour: string;
  protected tourLine: any;
  protected lineDecorator: any;
  protected loaded: boolean;
  protected timeOut: boolean;
  

  constructor(protected data: DataService, private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: Document) {}


  ngOnInit() {
    this.loaded = false;
    this.timeOut = false;
    this.selectLayers = {};
    this.layerNames = [];
    this.geoJsons = {};
      this.mapOptions = {
        layers: [
          //L.tileLayer('https://a.tiles.mapbox.com/v3/villeda.c4c63d13/{z}/{x}/{y}.png',
          //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          //L.tileLayer('https://a.tiles.mapbox.com/v3/smmaurer.k59p4an0/{z}/{x}/{y}.png',
          L.tileLayer('https://a.tiles.mapbox.com/v3/smmaurer.k59p72bl/{z}/{x}/{y}.png',
          //L.tileLayer('https://a.tiles.mapbox.com/v3/smmaurer.k59p92aj/{z}/{x}/{y}.png',
          //L.tileLayer('https://a.tiles.mapbox.com/v3/aj.03e9e12d/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: '...' })],
        zoom: this.zoom,
        center: L.latLng(45, -70)
      };
  }


  async onMapReady(map: L.Map) {
    setTimeout(() => {
      this.timeOut = true;
    }, 30000);
    this.document.getElementById("maploaded").style.visibility = "hidden";
    this.map = map
    this.venues = await this.data.getVenueCoordinates();
    var geoJsonData = this.getGeoJson(this.venues);
    var tours = await this.data.getTourCoordinates();
    var tourGeoJsonData = this.getTourJson(tours);
    var all = this.groupLayers(geoJsonData);
    this.geoJsons['all shows'] = geoJsonData;
    this.selectLayers['all shows'] = all;
    this.layerNames.push('all shows')
    this.selectLayers['all shows'].addTo(this.map)
    this.currentLayer = 'all shows';

    tourGeoJsonData.forEach(t =>{
      this.selectLayers[t[0]] = this.groupLayers(t[1]);
      this.geoJsons[t[0]] = t[1];
      this.geoJsons[t[0]].sort(this.dateSort())
      this.layerNames.push(t[0]); 
    })
    this.searchCtrl = L.control.fuseSearch({'showResultFct': function(feature, container) {
      var props = feature.properties;
      if (props.dates != '') {    // workaround for result list after first click on search button
        var name = L.DomUtil.create('span', null, container);
        name.innerHTML = props.name;
        //container.appendChild(L.DomUtil.create('br', null, container));
        //container.appendChild(document.createTextNode(props.dates));
    }
  }})
    this.searchCtrl.indexFeatures(geoJsonData, ['name', 'dates']); 
    this.searchCtrl.addTo(this.map);
    this.searchCtrl.indexFeatures(this.geoJsons['all shows'], ['name', 'dates']); 
    this.selectedTour = 'all shows';
    this.loaded = true;
    this.document.getElementById("maploaded").style.visibility = "visible";
    this.fitZoom();
   
  }

  
  dateStrings(s) {
    if (s != undefined){
      var htmlstring = '<br>';
      var datestring = '';
      var dates = s.map(e => [e.date, e.id])
      dates.sort()
      dates.forEach(e => {
        htmlstring += '<a style="color: black;" href="/#/show/' + e[1] + '">' + e[0] + '</a><br>' ;
        datestring += e[0] + ' '
      });
    return [datestring, htmlstring];
  }}


  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent, { maxHeight: 160 });
    }
    feature.layer = layer;
  }


  getGeoJson(shows){
    var geoJsonData = [];
    var latlongs = [];

    shows.forEach(v => {
      if (v.long != undefined) {
        var lat = parseFloat(v.lat);
        var long = parseFloat(v.long);
        while (this.searchForArray(latlongs,[lat, long]) != -1){  // prevent markers in same place
          lat += 0.001;
        }
        latlongs.push([lat, long])   
        var ds = this.dateStrings(v.shows);
        var datestring = ds[0];
        var venuehtml = ds[1];
        if (v.georss == 'city'){ venuehtml += '(marker for city only)' };
        var geojsonFeature = {
          'type': 'Feature',
          'properties': {
            'name': v.name,
            'dates': datestring,
            'popupContent': '<b><a style="color: black;" href="/#/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [lat, long]
          } };
          geoJsonData.push(geojsonFeature);
      }});
      return geoJsonData;
  }

 groupLayers(g){
    var l = [];
    var myIcon = L.icon({
      iconUrl: 'assets/dead_marker_small_shadow.png',
      iconSize: [null, 35],
      iconAnchor: [12, 34],
      popupAnchor: [-3, -32],
    });
    g.forEach(v => {
      var g = L.geoJSON(v, {
        onEachFeature: this.onEachFeature,
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: myIcon, riseOnHover: true});
        } })
      l.push(g)
    });
    var lg = L.layerGroup(l);
    return (lg)
  }


  getTourJson(t){
    var tours = []
    Object.keys(t).forEach(tour => {
      var geoJsonData = [];
      var latlongs = [];
      Object.keys(t[tour]).forEach(venue => {
        var venue_id = t[tour][venue].id;
        var long = parseFloat(t[tour][venue].long);
        var lat = parseFloat(t[tour][venue].lat);
        while (this.searchForArray(latlongs,[lat, long]) != -1){  // prevent markers in same place
          lat += 0.001;
        }
        latlongs.push([lat, long])     
        var shows = []
        t[tour][venue].shows.forEach(show => shows.push(show));
        var ds = this.dateStrings(shows);
        var datestring = ds[0];
        var venuehtml = ds[1];
        if (t[tour][venue].georss == 'city'){ venuehtml += '(marker for city only)' };   // todo: make work!
        var geojsonFeature = {
          'type': 'Feature',
          'properties': {
            'name': venue,
            'tour': tour,
            'dates': datestring,
            'popupContent': '<b><a style="color: black; "href="/#/venue/' + venue_id + '">' + venue + '</a></b>' + venuehtml
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [lat, long]
          } };
        geoJsonData.push(geojsonFeature);
      });
     if (geoJsonData.length > 0) {
        tours.push([tour, geoJsonData])
      } });
    return tours;
  }


  tourChanged(e){
    if (this.tourLine != undefined) {this.map.removeLayer(this.tourLine) }
    if (this.lineDecorator != undefined) {this.map.removeLayer(this.lineDecorator) }
    this.map.removeLayer(this.selectLayers[this.currentLayer])
    this.selectLayers[e].addTo(this.map)
    this.searchCtrl.indexFeatures(this.geoJsons[e], ['name', 'dates']); 
    this.currentLayer = e;
    if (e != 'all shows' && this.geoJsons[e].length > 1){
      this.connectTheDots(this.geoJsons[e])
    }
    this.fitZoom();
  }


  fitZoom(){
    var group = new L.featureGroup;
    this.map.eachLayer(l => { if (l['feature'] != undefined){ group.addLayer(l) } });
    this.map.fitBounds(group.getBounds());
    if (this.map.getZoom() > 10) { this.map.setZoom(10) }
  }


  connectTheDots(e){
    var c = [];
    e.forEach( i => c.push(_.clone(i.geometry.coordinates).reverse()));
    this.tourLine = L.polyline(c, {color: '#1D3A87', weight: 3}).addTo(this.map);
    console.log(this.tourLine)
    this.lineDecorator = L.polylineDecorator(this.tourLine, {
    patterns: [
      {offset: '0%', repeat: 40, symbol: L.Symbol.arrowHead(
        {pixelSize: 9, polygon: false, pathOptions: {weight: 3, color: '#1D3A87', stroke: true}})
      } ] }).addTo(this.map);
}


  dateSort() {
    return function (a,b) {
      var result = (a.properties.dates < b.properties.dates) ? -1 : (a.properties.dates > b.properties.dates) ? 1 : 0;
      return result;
    }
}


  searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
  }
  return -1;
}

}