import { Component, trigger, state, style, transition, animate } from '@angular/core';
import {MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-90%, 0, 0)'
      })),
      transition('in => out', animate('1000ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'app works!';

  menuState: string = 'out';

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  childToggle(e: boolean){
    if(e){
      this.toggleMenu();
    }
  }
}
