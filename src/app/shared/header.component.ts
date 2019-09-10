import { Component, Input } from '@angular/core';
import { Title, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { VIEWS } from '../globals';

@Component({
  selector: 'gd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
  protected image: SafeStyle;
  protected views = VIEWS;
  
  constructor(private sanitizer: DomSanitizer, private titleService: Title) {}
  
  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');
    this.titleService.setTitle('Grateful Live - '+this.title+', '+this.subtitle);
  }

}
