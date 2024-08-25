import { Component, OnInit } from '@angular/core';
import { version } from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  year = "";
  public version: string = version;

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
  }
}
