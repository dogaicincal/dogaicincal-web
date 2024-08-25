import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { DicModel } from '../../models/dic.model';
import { lastValueFrom } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit {
  dicList: Array<DicModel> = new Array<DicModel>();
  cityListMain: Array<CityModel> = new Array<CityModel>();
  cityList: Array<CityModel> = new Array<CityModel>();

  constructor(
    private dataService: DataService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.InitDataFromService();
  }

  public async InitDataFromService() {
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
    this.cityList = this.cityListMain;
  }

  public GetCityParams(item: CityModel) {
    let tempIndex = this.cityListMain.findIndex(x => x.name == item.name);

    return `${tempIndex}`;
  }

  public search(event: any) {
    let searchText = event.target.value;

    this.cityList = this.cityListMain.filter(x => x.name.toString().toLocaleLowerCase().includes(searchText.toString().toLocaleLowerCase()));
  }

}
