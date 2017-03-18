import { EventEmitter } from '@angular/forms/src/facade/async';
import { AuthorService } from '../../services/author-service';
import { Component, OnInit, Output } from '@angular/core';
import {Author} from '../../models/author';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  constructor(private authorService: AuthorService) { }

  newAuthor = new Author();
  @Output() hideModal = new EventEmitter<Boolean>();

  ngOnInit() {
  }

  onSubmit(){
    console.log("On Submit called");
    this.authorService.addAuthor(this.newAuthor)
    .subscribe(
      success => {
        if(success){
          this.newAuthor = new Author();
          this.hideModal.emit(true);
        }
      }
    )
  }
  hideChildModal(){
    this.hideModal.emit(true);
  }

}
