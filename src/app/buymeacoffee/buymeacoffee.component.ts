import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buymeacoffee',
  //templateUrl: './buymeacoffee.component.html',
  template: '<iframe src="https://www.buymeacoffee.com/widget/page/gratefullive?color=235F7FFF" style="position: relative;   top: 0;  bottom: 0; left: 0;   width: 100%;   height: 100%;  border: 0"></iframe>',
  //styleUrls: ['./buymeacoffee.component.sass']
})
export class BuyMeACoffeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
