import { Component } from '@angular/core';
import { IonApp, IonCard, IonCardContent, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, 
    IonRouterOutlet,  
    IonCard,
    IonCardContent
  ],
})
export class AppComponent {
  constructor() {}
}
