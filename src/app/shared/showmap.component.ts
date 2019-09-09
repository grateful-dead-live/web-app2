import { Component, Input } from '@angular/core';
import { VenueDetails } from '../services/types';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
//import * as Fuse from 'fuse.js'; // imported in angular.json

declare const L: any;
import 'leaflet';
import '../../leaflet-fusesearch/src/leaflet.fusesearch.js'


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

  constructor(protected data: DataService, private sanitizer: DomSanitizer) {}


  ngOnInit() {
      this.mapOptions = {
        layers: [
          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: '...' })],
        zoom: this.zoom,
        center: L.latLng(20, 20)
      };
  }


  onMapReady(map: L.Map) {
    this.map = map;

    const bears = [ 'bear_blue_100.png', 'bear_blue_100a.png', 'bear_green_100.png',
                    'bear_green_100a.png', 'bear_orange_100.png', 'bear_orange_100a.png',
                    'bear_pink_100.png', 'bear_pink_100a.png', 'bear_yellow_100.png',
                    'bear_yellow_100a.png' ]

    var geoJsonData = [];

    this.venues.forEach(v => {
    if (v.long != undefined) {
      var ds = this.dateStrings(v.shows);
      var datestring = ds[0];
      var venuehtml = ds[1];
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "name": v.name,
          "dates": datestring,
          "popupContent": '<b> <a href="/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml
        },
        "geometry": {
          "type": "Point",
          "coordinates": [v.lat, v.long]
        }
      };
      var myIcon = L.icon({
        iconUrl: 'assets/' + bears[Math.floor(Math.random()*bears.length)],
        iconSize: [null, 22],
        iconAnchor: [10, 21],
        popupAnchor: [0, -22],
      });
      L.geoJSON(geojsonFeature, {
        onEachFeature: this.onEachFeature,
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: myIcon, riseOnHover: true});
        }
      }).addTo(map)
      geoJsonData.push(geojsonFeature);
    }})

    var searchCtrl = L.control.fuseSearch({"showResultFct": function(feature, container) {
      var props = feature.properties;
      if (props.dates != "") {    // workaround for result list after first click on search button
        var name = L.DomUtil.create('span', null, container);
        name.innerHTML = props.name;
        //container.appendChild(L.DomUtil.create('br', null, container));
        //container.appendChild(document.createTextNode(props.dates));
    }
  }})

    searchCtrl.addTo(map);
    searchCtrl.indexFeatures(geoJsonData, ['name', 'dates']);
  }


  dateStrings(s) {
    if (s != undefined){
      var htmlstring = '<br>';
      var datestring = ''
      var dates = s.map(e => [e.date, e.id])
      dates.sort()
      dates.forEach(e => {
        htmlstring += '<a href="/show/' + e[1] + '">' + e[0] + '</a><br>' ;
        datestring += e[0] + " "
      });
    return [datestring, htmlstring];
  }}


  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
    feature.layer = layer;
  }
}
