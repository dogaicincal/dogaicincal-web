import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public GetData() {
    return this.http.get(this.configService.GetDataUrl())
  }
}
