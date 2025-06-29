import { Injectable } from '@angular/core';
import { LanguageModel } from '../../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public GetLanguageList(): Array<LanguageModel> {
    let languageList: Array<LanguageModel> = new Array<LanguageModel>();
    languageList = [
      { code: "tr", displayText: "Türkçe", turkishNameForMe: "Türkçe" },
      { code: "en", displayText: "English", turkishNameForMe: "İngilizce" },
    ]

    return languageList;
  }

  public GetLanguageLocalStorageKeyName() {
    return "langkey";
  }

  public GetDefaultLanguageCode() {
    return "tr";
  }

  public GetDataUrl() {
    return "https://raw.githubusercontent.com/dogaicincal/data/main/info.json";
  }

  public GetProjectImageUrl(code: string) {
    return `https://raw.githubusercontent.com/dogaicincal/content/main/img/${code}.png`;
  }

  public GetYoutubeEmbedUrl(code: string) {
    return `https://www.youtube.com/embed/${code}`;
  }

  public GetArchiveVideoUrl(code: string) {
    return `https://archive.org/download/dic-video/${code}.mp4`;
  }
}
