import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//Routing Module
import {AppRoutingModule} from './app-routing.module'


//Adding the sidebar
import {SidebarModule } from 'ng-sidebar';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

//Authors Routes
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsListComponent } from './authors/authors-list/authors-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { AuthorComponent } from './authors/author/author.component';

//Books Routes


//Importing Services
import {AuthorService} from './services/author-service';
import {BookService} from './services/book-service';
import {MissionService} from './services/mission-service';


//Ng2-Bootstrap Modules
import {ModalModule} from 'ng2-bootstrap/modal';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { PaginationModule } from 'ng2-bootstrap/pagination';

//Ng-Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AuthorsComponent,
    AuthorsListComponent,
    AuthorDetailsComponent,
    AuthorComponent,
    BooksComponent,
    BookComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AddBookComponent,
    EditBookComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    DatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    BookService,
    AuthorService,
    MissionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
