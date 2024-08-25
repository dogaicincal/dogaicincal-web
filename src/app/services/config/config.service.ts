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
      { code: "de", displayText: "Deutsch", turkishNameForMe: "Almanca" },
      { code: "fr", displayText: "Français", turkishNameForMe: "Fransızca" },
      { code: "ka", displayText: "ქართული", turkishNameForMe: "Gürcüce" },
      { code: "bg", displayText: "Български", turkishNameForMe: "Bulgarca" },
      { code: "so", displayText: "Somali", turkishNameForMe: "Somalice" },
      { code: "nl", displayText: "Nederlands", turkishNameForMe: "Hollandaca" },
      { code: "zh", displayText: "中文", turkishNameForMe: "Çince" },
      { code: "ja", displayText: "日本語", turkishNameForMe: "Japonca" },
      { code: "ko", displayText: "한국어", turkishNameForMe: "Korece" },
      { code: "es", displayText: "Español", turkishNameForMe: "İspanyolca" },
      { code: "az", displayText: "Azərbaycan", turkishNameForMe: "Azerice" },
      { code: "ga", displayText: "Gaeilge", turkishNameForMe: "İrlandaca" },
      { code: "no", displayText: "Norsk", turkishNameForMe: "Norveççe" },
      { code: "sv", displayText: "Svenska", turkishNameForMe: "İsveççe" },
      { code: "da", displayText: "Dansk", turkishNameForMe: "Danimarkaca" },
      { code: "ru", displayText: "Русский", turkishNameForMe: "Rusça" },
      { code: "fi", displayText: "Suomi", turkishNameForMe: "Fince" },
      { code: "hi", displayText: "हिंदी", turkishNameForMe: "Hintçe" },
      { code: "ar", displayText: "العربية", turkishNameForMe: "Arapça" },
      { code: "fa", displayText: "فارسی", turkishNameForMe: "Farsça" },
      { code: "it", displayText: "Italiano", turkishNameForMe: "İtalyanca" },
      { code: "ku", displayText: "Kurdî", turkishNameForMe: "Kürtçe" },
      { code: "pt", displayText: "Português", turkishNameForMe: "Portekizce" },
      { code: "ber", displayText: "ⵜⵉⵏⴰⵏⵓⵙⵏ", turkishNameForMe: "Berberce-Fas" },
      { code: "sw", displayText: "Kiswahili", turkishNameForMe: "Swahili-Uganda" },
      { code: "rw", displayText: "Ikinyarwanda", turkishNameForMe: "Kinyarwanda-Ruanda" },
      { code: "bn", displayText: "বাংলা", turkishNameForMe: "Bengalce" },
      { code: "th", displayText: "ไทย", turkishNameForMe: "Tayca" },
      { code: "af", displayText: "Afrikaans", turkishNameForMe: "Afrikaans" },
      { code: "el", displayText: "Ελληνικά", turkishNameForMe: "Yunanca" },
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
}
