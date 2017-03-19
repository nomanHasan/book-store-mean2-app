import { Book } from '../../models/book';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {BookService} from '../../services/book-service';
import {MissionService} from '../../services/mission-service';

//Importing MOmentJS
import * as moment from 'moment';

//File Upload
import {FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private missionService: MissionService
  ) { }

  @Input() newBook: Book;

  @Output() hideModal  = new EventEmitter<Boolean>();

  showCalendar : boolean = false;
  
  public uploader:FileUploader ;

  ngOnInit() {
    var URL = '/api/books/upload/' + this.newBook._id;
    this.uploader = new FileUploader({url: URL});
    this.missionService.appendInstructions("You can re-upload a Image. The Old Image will be automatically deleted once you reupload.")
  }

  onSubmit(){
    if(this.uploader.queue.length > 0){
      this.uploader.queue[0].upload();
    }
    this.bookService.editBookById(this.newBook)
    .subscribe(
      success=> {
        if(success){
          this.hideModal.emit(true);
        }
      }
    )
  }

  hideChildModal(){
    this.hideModal.emit(true);
  }

  toggleCalendar(){
    this.showCalendar = this.showCalendar ? false: true;
  }

}
