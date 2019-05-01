import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  constructor(private data: DataService) {}
  
  async ngOnInit() {
    await this.data.selectRandomEvent();
  }
}
