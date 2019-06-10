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
  protected options: MapOptions;
  
  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18, attribution: '...' }),
        marker([this.latitude, this.longitude], {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/marker-icon-2x.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        })
      ],
      zoom: this.zoom,
      center: latLng(this.latitude, this.longitude)
    };
  }

}