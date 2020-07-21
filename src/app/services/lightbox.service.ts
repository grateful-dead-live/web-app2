import { Injectable } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  constructor(private lightbox: Lightbox, private lightboxConfig: LightboxConfig) {
    lightboxConfig.wrapAround = true;
    //lightboxConfig.showZoom = true;
   }

   

  makeGallery(a) {
    var carousel = [];
    var lightboxa = [];
    a.forEach(function (value, i){
      var t = value;
      t['index'] = i;
      if (!value.thumbnail) t['thumbnail'] = t.image;
      carousel.push(t);
      lightboxa.push({
        src: value.image,
        caption: value.description
      });
    });
    return [lightboxa, carousel];
  }

  openLightboxArray(lightboxArray, index: number): void {
    this.lightbox.open(lightboxArray, index);
  }

  openLightBoxSingle(a): void {
    this.lightbox.open([{ src: a.image, caption: a.description, thumb: '' }], 0)
  }

}