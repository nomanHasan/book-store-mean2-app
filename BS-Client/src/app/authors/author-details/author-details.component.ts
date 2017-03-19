import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {AuthorService } from '../../services/author-service';
import {BookService} from '../../services/book-service';
import {MissionService} from '../../services/mission-service';


import {BookComponent } from '../../books/book/book.component';
import {EditAuthorComponent} from '../edit-author/edit-author.component';
import { AddBookComponent } from '../../books/add-book/add-book.component';
import {EditBookComponent} from '../../books/edit-book/edit-book.component';

import { ModalDirective } from 'ng2-bootstrap/modal';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private bookService: BookService,
    private missionService: MissionService
  ) { }

  @ViewChild('childModal') public childModal:ModalDirective;

  @ViewChild('addBookModal') public addBookModal:ModalDirective;
  @ViewChild('editBookModal') public editBookModal:ModalDirective;
  
  author: Author;
  books: Book[];
  errorMessage: string;
  id: string;
  newBook: Book ;
  editBook: Book;

  public totalItems: number;
  public currentPage: number = 1;
  public limit: number = 9;
  public pages: number;

  ngOnInit() {
    this.missionService.setInstructions("Images can be uploaded for every author by clicking the Edit Author Button. Author Books tab contains the books of the author.");
    this.missionService.appendInstructions("Books can be edited by Double Clicking on it.");
    this.route.params
    .subscribe(
      (params: Params)=>{
        this.id = params["id"];
        this.authorService.getAuthorById(params["id"])
        .subscribe(
          author => {this.author = author},
          error=>{this.errorMessage = <any>error }
        );
        this.getBooks();
      }
    )
  }

  editAuthor(){
    this.missionService.setInstructions("Click the choose file button to change upload an Profile Image.");
    this.missionService.appendInstructions("You can re-upload a Image. The Old Image will be automatically deleted once you reupload.")
    this.childModal.show();
  }

  getBooks(){
    this.bookService.getBooksByAuthor(this.id, this.currentPage, this.limit)
      .subscribe(
        res => {
          this.books = res.results.docs as Book[];
          this.totalItems = res.results.total;
          this.pages = res.results.pages;
        },
        error => this.errorMessage = <any>error
      )
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getBooks();
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  hideModal(){
    this.missionService.setInstructions("Books can be edited by Double clicking on the books.")
    this.childModal.hide();
    this.authorService.getAuthorById(this.id)
        .subscribe(
          author => {this.author = author},
          error=>{this.errorMessage = <any>error }
        );
  }

  hideAddBookModal(){
    this.missionService.appendInstructions("Books can be edited by Double Clicking on it.");
    this.addBookModal.hide();
    this.getBooks();
  }

  addBook(){
    this.missionService.setInstructions("Images can be uploaded for each Books by double clicking on the book.");
    this.newBook = new Book();
    this.newBook.authorId = this.id;
    console.log(this.newBook);
    this.addBookModal.show();
  }

  editBooks(book: Book){
    console.log(book);
    this.editBook = book;
    this.editBookModal.show();
  }

  hideEditBookModal(){
    this.editBookModal.hide();
    this.getBooks();
  }


}
