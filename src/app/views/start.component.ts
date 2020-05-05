import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'gd-start',
  templateUrl: './start.component.html'
})
export class StartComponent {
  part1: String;
  part2: String;
  part3: String;
  part4: String;
  part5: String;
  part6: String;
  part7: String;
  
  constructor(private sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.part1 = "gdc";
    this.part2 = "oncert";
    this.part3 = "explo";
    this.part4 = "rer";
    var at = Math.pow(2,6);
    this.part5 = String.fromCharCode(at);
    this.part6 = "gmai";
    this.part7 = "l.com";
  }

}
