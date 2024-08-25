import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { DicModel } from '../../models/dic.model';
import { lastValueFrom } from 'rxjs';
import { ArtistModel } from '../../models/artist.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {
  dicList: Array<DicModel> = new Array<DicModel>();
  artistListMain: Array<ArtistModel> = new Array<ArtistModel>();
  artistList: Array<ArtistModel> = new Array<ArtistModel>();

  constructor(
    private dataService: DataService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.InitDataFromService();
  }

  public async InitDataFromService() {
    this.dicList = await lastValueFrom(this.dataService.GetData()) as Array<DicModel>;

    this.artistListMain = new Array<ArtistModel>();
    this.dicList.forEach(item => {
      item.artist.forEach(artist => {
        if (!this.artistListMain.find(x => x.name == artist.name)) {
          this.artistListMain.push(artist);
        }
      });
    });
    this.artistList = this.artistListMain;
  }

  public GetArtistParams(item: ArtistModel) {
    let tempCode = this.dicList.find(x => x.name == item.project[0])?.code;
    let tempIndex = this.dicList.find(x => x.name == item.project[0])?.artist.findIndex(x => x.name == item.name);

    return `${tempCode}/${tempIndex}`
  }

  public search(event: any) {
    let searchText = event.target.value;

    this.artistList = this.artistListMain.filter(x => x.name.toString().toLocaleLowerCase().includes(searchText.toString().toLocaleLowerCase()));
  }
}
