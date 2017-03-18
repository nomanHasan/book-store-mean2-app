import { Book } from '../../models/book';
import { Component, OnInit, Input } from '@angular/core';

//MomentJS
import * as moment from 'moment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  @Input() book: Book;
  date: string;

  coverImage: string;

  ngOnInit() {
    this.date = moment(this.book.pub_date).format('MMMM Do YYYY');
    if(this.book.coverImage){
      this.coverImage = "/images/"+ this.book.coverImage;
    }else{
      this.coverImage = "/images/lotr2.jpg";
    }
  }

}
