import { Directive,HostListener,Input } from '@angular/core';
import { DEBUG } from './config';

console.log = function(s){
  if (!DEBUG) {
    console.warn(s);
  }; 
};


@Directive({
  selector: '[eventTracker]'
})
export class ButtonDirective {

  @Input('eventTracker') option:any;

  @HostListener('click', ['$event']) onClick($event){

    (<any>window).ga('send', 'event', this.option.category, this.option.action, {
      hitCallback: function() {

        console.log('tracking event');

      }

    });

  }
  constructor() { }

}