import { Component } from '@angular/core';
import { SesionService } from './sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '1FM045-ionic-angular';

  constructor(public s : SesionService) {
    
  }

  
}