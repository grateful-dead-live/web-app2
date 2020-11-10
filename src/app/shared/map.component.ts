import { Component, Input } from '@angular/core';
import { tileLayer, latLng, marker, icon, MapOptions } from 'leaflet';

@Component({
  selector: 'gd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {
  
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number;
  public options: MapOptions;
  
  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //tileLayer('https://a.tiles.mapbox.com/v3/smmaurer.k59p72bl/{z}/{x}/{y}.png',
          { maxZoom: 17, attribution: '...' }),
        marker([this.latitude, this.longitude], {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/marker-icon-2x.png',
            //shadowUrl: 'assets/marker-shadow.png'
          })
        })
      ],
      zoom: this.zoom,
      center: latLng(this.latitude, this.longitude)
    };
  }

}