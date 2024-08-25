import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { ConfigService } from '../../services/config/config.service';
import { DicModel } from '../../models/dic.model';
import { lastValueFrom } from 'rxjs';
import { ArtistModel } from '../../models/artist.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit {
  private route = inject(ActivatedRoute);

  dicList: Array<DicModel> = new Array<DicModel>();
  artistModel: ArtistModel = new ArtistModel();
  codeName = "";
  index = "";

  constructor(
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.codeName = this.route.snapshot.paramMap.get('code')?.toString() || "";
    this.index = this.route.snapshot.paramMap.get('index')?.toString() || "";

    this.dicList = await lastValueFrom(this.dataService.GetData()) as Array<DicModel>;

    
    if (!this.dicList.find(x => x.code == this.codeName)) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
    else if (!this.dicList.find(x => x.code == this.codeName)?.artist[Number(this.index)].name) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
    else {
      this.artistModel = this.dicList.find(x => x.code == this.codeName)?.artist[Number(this.index)] || new ArtistModel();
    }
  }

  public GetProjectCode(name: string) {
    return this.dicList.find(x => x.name == name)?.code;
  }

}
