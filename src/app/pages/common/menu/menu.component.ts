import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { LanguageModel } from '../../../models/language.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  selectedLanguage: LanguageModel = new LanguageModel();
  languageList: Array<LanguageModel> = new Array<LanguageModel>();

  constructor(
    private configService: ConfigService,
    public translate: TranslateService
  ) {
    this.languageList = this.configService.GetLanguageList();

    let languageCode = localStorage.getItem(this.configService.GetLanguageLocalStorageKeyName());
    if (languageCode) {
      this.selectedLanguage = this.languageList.find(x => x.code == languageCode) || new LanguageModel();
    }
  }

  public UseLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem(this.configService.GetLanguageLocalStorageKeyName(), language);
    this.selectedLanguage = this.languageList.find(x => x.code == language) || new LanguageModel();
  }
}
