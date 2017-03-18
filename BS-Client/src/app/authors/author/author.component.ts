import { Component, OnInit, Input } from '@angular/core';

import {Author} from '../../models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor() { }

  @Input() author: Author;

  profilePhoto: string;
  @Input() randPhoto: string;

  ngOnInit() {
    if(this.author.profilePhoto){
      this.profilePhoto = "/images/"+ this.author.profilePhoto;
    }else{
      this.profilePhoto = "/images/"+this.randPhoto;
    }
  }

}
