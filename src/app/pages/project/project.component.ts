import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { ConfigService } from '../../services/config/config.service';
import { DicModel } from '../../models/dic.model';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from "../../core/tools/pipes/safe/safe.pipe";
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [SafePipe, TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  private route = inject(ActivatedRoute);

  dicList: Array<DicModel> = new Array<DicModel>();
  projectModel: DicModel = new DicModel();
  codeName = "";
  videoUrl: any;

  prevButtonText = "";
  nextButtonText = "";

  constructor(
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private sanitizer: DomSanitizer
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.codeName = this.route.snapshot.paramMap.get('code')?.toString() || "";

    this.dicList = await lastValueFrom(this.dataService.GetData()) as Array<DicModel>;

    if (!this.dicList.find(x => x.code == this.codeName)) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
    else {
      this.projectModel = this.dicList.find(x => x.code == this.codeName) || new DicModel();
      this.videoUrl = this.configService.GetYoutubeEmbedUrl(this.projectModel.video.youtubeCode);

      let projectIndex = this.dicList.indexOf(this.projectModel);

      if (this.dicList[projectIndex - 1]) {
        this.prevButtonText = this.dicList[projectIndex - 1].code;
      }
      if (this.dicList[projectIndex + 1]) {
        this.nextButtonText = this.dicList[projectIndex + 1].code;
      }
    }
  }

  public GoToProject(name: string) {
    this.router.navigateByUrl('/project', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/project/${name}`]);
    });
  }
}
