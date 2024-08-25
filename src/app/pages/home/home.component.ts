import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { DicModel } from '../../models/dic.model';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  dicList: Array<DicModel> = new Array<DicModel>();
  totalArtist: number = 0;
  totalProject: number = 0;
  totalSong: number = 0;

  constructor(
    private dataService: DataService,
    private configService: ConfigService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.InitDataFromService();
  }

  public async InitDataFromService() {
    this.dicList = await lastValueFrom(this.dataService.GetData()) as Array<DicModel>;
    this.dicList = this.dicList.reverse();
    this.totalProject = this.dicList.length;
    this.totalSong = this.dicList.reduce((total, x) => total + x.song.length, 0);

    let uniqueArtistList: Set<string> = new Set<string>();
    this.dicList.forEach(item => {
      item.artist.forEach(artist => {
        uniqueArtistList.add(artist.name);
      });
    });
    this.totalArtist = uniqueArtistList.size;
  }

  public GetProjectImageUrl(code: string) {
    return this.configService.GetProjectImageUrl(code);
  }
}