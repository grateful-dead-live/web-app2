import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Artifact, ArtifactType } from '../services/types';

@Component({
  selector: 'gd-artifacts',
  templateUrl: './artifacts.component.html'
})
export class ArtifactsComponent {
  
  protected artifacts: Artifact[];
  protected types: ArtifactType[];
  
  constructor(protected data: DataService, private route: ActivatedRoute) {}
  
  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        //show fullscreen artifact
      } else if (params.has('types')) {
        this.types = JSON.parse(params.get('types'));
        this.artifacts = await this.data.getRandomArtifacts(this.types, 6);
      } else {
        this.artifacts = await this.data.getRandomArtifacts(null, 6);
        console.log(this.artifacts)
      }
    });
  }
}
