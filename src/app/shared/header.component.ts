import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'gd-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
  protected image: SafeStyle;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    this.image =
      this.sanitizer.bypassSecurityTrustStyle('url('+this.imageUrl+')');
  }

}
