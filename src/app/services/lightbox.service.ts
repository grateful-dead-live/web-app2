import { Injectable } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  constructor(private lightbox: Lightbox) { }


  makeGallery(a){
    var carousel = [];
    var lightboxa = [];
    a.forEach(function (value, i){
      var t = value;
      t['index'] = i;
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

  openLightBoxSingle(a){
    this.lightbox.open([{src: a.image, caption: a.description, thumb: a.thumbnail }], 0)
  }

}
