import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data/data.service';
import { ConfigService } from '../../services/config/config.service';
import { DicModel } from '../../models/dic.model';
import { CountryModel } from '../../models/country.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);

  dicList: Array<DicModel> = new Array<DicModel>();
  countryListMain: Array<CountryModel> = new Array<CountryModel>();
  countryModel: CountryModel = new CountryModel();
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

    this.countryListMain = new Array<CountryModel>();
    this.dicList.forEach(item => {
      item.artist.forEach(artist => {
        if (!this.countryListMain.find(x => x.name == artist.country)) {
          let tempCountry = new CountryModel();
          tempCountry.name = artist.country;
          tempCountry.artist = new Array<string>();
          tempCountry.artist.push(artist.name);
          this.countryListMain.push(tempCountry);
        }
        else {
          let tempCountry = this.countryListMain.find(x => x.name == artist.country);
          if (!tempCountry?.artist.find(x => x == artist.name)) {
            this.countryListMain.find(x => x.name == artist.country)?.artist.push(artist.name);
          }
        }
      });
    });
    this.countryListMain = this.countryListMain.sort((a, b) => b.artist.length - a.artist.length);

    if (!this.countryListMain[Number(this.index)].name) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
    else {
      this.countryModel = this.countryListMain[Number(this.index)] || new CountryModel();
    }
  }

  public GetArtistParams(name: string) {
    let tempCode = this.dicList.find(x => x.artist.find(y => y.name == name))?.code;
    let tempIndex = this.dicList.find(x => x.artist.find(y => y.name == name))?.artist.findIndex(x => x.name == name);

    return `${tempCode}/${tempIndex}`
  }
}
