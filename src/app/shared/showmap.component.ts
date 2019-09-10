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
  //@Input() venues: VenueDetails[];
  protected venues: VenueDetails[];
  //protected tours: any;
  protected mapOptions: L.MapOptions;
  protected map: L.Map;

  constructor(protected data: DataService, private sanitizer: DomSanitizer) {}


  ngOnInit() {

      this.mapOptions = {
        layers: [
          L.tileLayer('https://a.tiles.mapbox.com/v3/villeda.c4c63d13/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: '...' })],
        zoom: this.zoom,
        center: L.latLng(45, -70)
      };
  }

  // http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  //https://a.tiles.mapbox.com/v3/{}/{z}/{x}/{y}.png'
  // villeda.c4c63d13 smmaurer.k59p4an0 smmaurer.k59p72bl aj.03e9e12d 

  async onMapReady(map: L.Map) {
    this.map = map
 
    this.venues = await this.data.getVenueCoordinates();
    var geoJsonData = this.getGeoJson(this.venues);

    var tours = await this.data.getTourCoordinates();
    var tourGeoJsonData = this.getTourJson(tours);

    


    var all = this.addAllToMap(geoJsonData);
    all.addTo(this.map)

    var selectLayers = {"all": all};

    tourGeoJsonData.forEach(t =>{
      console.log(t[0])
  
      var l = this.addAllToMap(t[1]);
      selectLayers[t[0]] = l

    })





    L.control.layers(selectLayers).addTo(this.map);

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
      layer.bindPopup(feature.properties.popupContent, { maxHeight: 160 });
    }
    feature.layer = layer;
  }


  getGeoJson(shows){
    var geoJsonData = [];
    shows.forEach(v => {
      if (v.long != undefined) {
        var ds = this.dateStrings(v.shows);
        var datestring = ds[0];
        var venuehtml = ds[1];
        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "name": v.name,
            "dates": datestring,
            "popupContent": '<b><a href="/venue/' + v.id + '">' + v.name + '</a></b>' + venuehtml
          },
          "geometry": {
            "type": "Point",
            "coordinates": [v.lat, v.long]
          }
        };

          geoJsonData.push(geojsonFeature);
      }})

      return geoJsonData;

  }

  addAllToMap(g){
    //var lg = new L.layerGroup
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
        }
      })
      l.push(g)

    })
    var lg = L.layerGroup(l);
    //lg.addTo(this.map)

    return (lg)
    
    
  }


  getTourJson(t){
    var myIcon = L.icon({
      iconUrl: 'assets/dead_marker_small_shadow.png',
      iconSize: [null, 35],
      iconAnchor: [12, 34],
      popupAnchor: [-3, -32],
    });

    var tours = []
    Object.keys(t).forEach(tour => {
      var geoJsonData = [];
      //console.log(t[tour])
      Object.keys(t[tour]).forEach(venue => {
        
        var venue_id = t[tour][venue].id;
        var long = t[tour][venue].long;
        var lat = t[tour][venue].lat;
        var shows = []
        t[tour][venue].shows.forEach(show => {
          shows.push(show)
        });
        var ds = this.dateStrings(shows);
        var datestring = ds[0];
        var venuehtml = ds[1];

        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "name": venue,
            "dates": datestring,
            "popupContent": '<b><a href="/venue/' + venue_id+ '">' + venue + '</a></b>' + venuehtml
          },
          "geometry": {
            "type": "Point",
            "coordinates": [lat, long]
          }
        };
        geoJsonData.push(geojsonFeature);

      });
      
      if (geoJsonData.length > 0) {
      tours.push([tour, geoJsonData])
      }
    });


    

    return tours;

  }


}