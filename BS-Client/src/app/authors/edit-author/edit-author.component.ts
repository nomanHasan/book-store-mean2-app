import { Author } from '../../models/author';
import { AuthorService } from '../../services/author-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



//File Upload
import {FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})


export class EditAuthorComponent implements OnInit {

  constructor(
    private authorService: AuthorService
  ) { }

  @Input() newAuthor : Author;
  @Output() hideModal = new EventEmitter<Boolean>();

  
  public uploader:FileUploader ;

  ngOnInit() {
    var URL = '/api/authors/upload/' + this.newAuthor._id;
    this.uploader = new FileUploader({url: URL});
  }

  onSubmit(){
    if(this.uploader.queue.length > 0){
      this.uploader.queue[0].upload();
    }
    this.authorService.editAuthor(this.newAuthor)
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
