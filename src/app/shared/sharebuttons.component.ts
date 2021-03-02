import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DOMAIN } from '../config';

@Component({
  selector: 'gd-sharebuttons',
  templateUrl: './sharebuttons.component.html',
  styleUrls: ['sharebuttons.component.sass']
})
export class ShareButtonsComponent {
  public url: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.url = 'https://' + DOMAIN + this.router.url;
  }

}