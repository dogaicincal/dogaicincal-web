import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DicModel } from '../../models/dic.model';
import { ArtistModel } from '../../models/artist.model';
import { DataService } from '../../services/data/data.service';
import { ConfigService } from '../../services/config/config.service';
import { lastValueFrom } from 'rxjs';
import { CityModel } from '../../models/city.model';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  private route = inject(ActivatedRoute);

  dicList: Array<DicModel> = new Array<DicModel>();
  cityListMain: Array<CityModel> = new Array<CityModel>();
  cityModel: CityModel = new CityModel();
  index = "";

  constructor(
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.index = this.route.snapshot.paramMap.get('index')?.toString() || "";

    this.dicList = await lastValueFrom(this.dataService.GetData()) as Array<DicModel>;

    this.cityListMain = new Array<CityModel>();
    this.dicList.forEach(item => {
      item.artist.forEach(artist => {
        if (!this.cityListMain.find(x => x.name == artist.city)) {
          let tempCity = new CityModel();
          tempCity.name = artist.city;
          tempCity.country = artist.country;
          tempCity.artist = new Array<string>();
          tempCity.artist.push(artist.name);
          this.cityListMain.push(tempCity);
        }
        else {
          let tempCity = this.cityListMain.find(x => x.name == artist.city);
          if (!tempCity?.artist.find(x => x == artist.name)) {
            this.cityListMain.find(x => x.name == artist.city)?.artist.push(artist.name);
          }
        }
      });
    });
    this.cityListMain = this.cityListMain.sort((a, b) => b.artist.length - a.artist.length);

    if (!this.cityListMain[Number(this.index)].name) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
    else {
      this.cityModel = this.cityListMain[Number(this.index)] || new CityModel();
    }
  }

  public GetArtistParams(name: string) {
    let tempCode = this.dicList.find(x => x.artist.find(y => y.name == name))?.code;
    let tempIndex = this.dicList.find(x => x.artist.find(y => y.name == name))?.artist.findIndex(x => x.name == name);

    return `${tempCode}/${tempIndex}`
  }
}
