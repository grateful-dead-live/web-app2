import { Directive,HostListener,Input } from '@angular/core';
import { logger } from './globals';

@Directive({
  selector: '[eventTracker]'
})
export class ButtonDirective {

  @Input('eventTracker') option:any;

  @HostListener('click', ['$event']) onClick($event){

    (<any>window).ga('send', 'event', this.option.category, this.option.action, {
      hitCallback: function() {

        logger('tracking event');

      }

    });

  }
  constructor() { }

}