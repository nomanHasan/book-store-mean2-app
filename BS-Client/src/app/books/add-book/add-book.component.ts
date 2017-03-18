import { Book } from '../../models/book';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {BookService} from '../../services/book-service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(
    private bookService: BookService
  ) { }

  @Input() newBook: Book;

  @Output() hideModal  = new EventEmitter<Boolean>();
  showCalendar : boolean = false;
  ngOnInit() {
  }

  onSubmit(){
    this.bookService.addBookByAuthor(this.newBook)
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
