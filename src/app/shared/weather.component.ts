import { Component, Input } from '@angular/core';
import { Weather } from '../services/types';

@Component({
  selector: 'gd-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent {
  @Input() weather: Weather;
}
