import { Component } from '@angular/core';
import { HeaderComponent } from "./pages/common/header/header.component";
import { MenuComponent } from "./pages/common/menu/menu.component";
import { BodyComponent } from "./pages/common/body/body.component";
import { FooterComponent } from "./pages/common/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent, BodyComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private configService: ConfigService,
    public translate: TranslateService
  ) {
    translate.addLangs(this.configService.GetLanguageList().map(x => x.code));

    let tempLangValue = localStorage.getItem(this.configService.GetLanguageLocalStorageKeyName());
    if (tempLangValue) {
      translate.use(tempLangValue);
    }
    else {
      translate.use(this.configService.GetDefaultLanguageCode());
      localStorage.setItem(this.configService.GetLanguageLocalStorageKeyName(), this.configService.GetDefaultLanguageCode());
    }
  }
}