import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '../services/types';
import { AuthService } from '../auth.service';
import { DeadEventInfo } from '../services/types';
import { DialogService } from '../services/dialog.service';

declare let gtag: Function;

@Component({
  selector: 'gd-location',
  templateUrl: './location.component.html'
})
export class LocationComponent {
  protected location: Location;
  protected currentUser: any = { userName: '', userId:'' };;
  
  constructor(protected data: DataService, private router: Router,
    private route: ActivatedRoute, public auth: AuthService, private dialog: DialogService) {

      

    }

    ngOnInit() {
      this.auth.userProfile$.subscribe(userProfile => {
        if (userProfile){
          this.currentUser = {
            userId: userProfile.sub.split("|")[1],
            userName: userProfile['http://example.com/username']
          }
          gtag('set', {'user_id': this.currentUser.userId});
        }
      });
      /*
      if (this.route.snapshot.data['loggedIn']) {
        this.auth.userProfile$.subscribe(userProfile => {
          this.currentUser = this.resolve.getUser(userProfile);
        });
        console.log(this.currentUser);
      } */
   
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.location = await this.data.getLocation(params.get('id'));
      }
      if (!this.location) {
        this.router.navigate(['/location',
          (await this.data.getRandomLocation()).id], { replaceUrl: true });
      }
    });
  }

  protected openOptionsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      event.venue+", "+event.date,
      ["Go to show", "Go to recording"],
      [() => this.router.navigate(['/show', event.id]),
        () => this.openRecordingsDialog(event)]
    );
  }

  private openRecordingsDialog(event: DeadEventInfo) {
    this.dialog.openMultiFunction(
      "Recordings of '"+event.venue+", "+event.date,
      event.recordings.map(r => r.etreeId),
      event.recordings.map(r => () => this.router.navigate(['/recording', r.id]) )
    );
  }

}
