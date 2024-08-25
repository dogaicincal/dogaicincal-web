import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DicModel } from '../../models/dic.model';
import { CountryModel } from '../../models/country.model';
import { DataService } from '../../services/data/data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  dicList: Array<DicModel> = new Array<DicModel>();
  countryListMain: Array<CountryModel> = new Array<CountryModel>();
  countryList: Array<CountryModel> = new Array<CountryModel>();

  constructor(
    private dataService: DataService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.InitDataFromService();
  }

  public async InitDataFromService() {
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
    this.countryList = this.countryListMain;
  }

  public GetCountryParams(item: CountryModel) {
    let tempIndex = this.countryListMain.findIndex(x => x.name == item.name);

    return `${tempIndex}`;
  }

  public search(event: any) {
    let searchText = event.target.value;

    this.countryList = this.countryListMain.filter(x => x.name.toString().toLocaleLowerCase().includes(searchText.toString().toLocaleLowerCase()));
  }
}
