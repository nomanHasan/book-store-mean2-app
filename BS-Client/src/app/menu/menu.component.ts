import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MissionService} from '../services/mission-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private missionService: MissionService) { }

  @Output() toggleClick = new EventEmitter<boolean>();

  ngOnInit() {
    
  }
  toggle(){
    this.toggleClick.emit(true);
  }

}
