import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';



@Component({
  selector: 'gd-start',
  templateUrl: './start.component.html'
})
export class StartComponent {
  
  constructor(private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute) {}
 
  
  

}
