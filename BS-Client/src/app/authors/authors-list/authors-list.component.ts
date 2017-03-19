import { AuthorService } from '../../services/author-service';
import { Component, OnInit, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { Router } from '@angular/router';
import {Author} from '../../models/author';
import {AuthorComponent} from '../author/author.component';
import {AddAuthorComponent} from '../add-author/add-author.component';
import { ModalDirective } from 'ng2-bootstrap/modal';

import {MissionService} from '../../services/mission-service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css'],
  animations: [
    trigger('slideInOut', [
        state('in', style({
            opacity: 1,
            transform: 'translateY(-100%)'
        })),
        state('out', style({
            opacity: 0,
            transform: 'translateY(50%)'
        })),
        transition('in => out', animate('.5s')),
        transition('out => in', animate('.5s'))
    ])
  ],
})


export class AuthorsListComponent implements OnInit {

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private missionService: MissionService
    ) { }

  randPhotosList = ["conan.jpg", "dbrown.jpg", "george.jpeg", "leo.jpg", "najrul.jpg", "shakespeare.jpg", "tolkien.jpg"];
  getRandPhoto(index: number){
    var ind = index % 7;
    // console.log(index + " " + ind);
    var photo = this.randPhotosList[ ind ];
    // console.log(index + " " + ind);
    return photo;
  }

  public authors: Author[];

  public newAuthor  = new Author();

  public errorMessage: string;

  listState: string = 'out';

  @ViewChild('childModal') public childModal:ModalDirective;


  public totalItems: number;
  public currentPage: number = 1;
  public limit: number = 9;
  public pages: number;
  public itemPerPageArray: number[] = [3, 6, 9, 15, 21, 30, 45, 60];

  instruct = "Here you can Add Authors by clicking the Add button.</li><li> Authors Details page can be accessed by Double clicking the Author.</li><li> Here first time random pictures are assigned to each authors for visualization. </li><li> Appropriate Images can be assigned when editing the Author.";

  ippChage(event: number){
    this.limit = event;
    this.getAuthors();
  }

  ngOnInit() {
    this.listState = 'in';
    this.missionService.setInstructions(this.instruct);
    this.getAuthors();
  }

  getAuthors(){
    this.authorService.getAuthors(this.currentPage, this.limit)
    .subscribe(
      res => {
        this.authors = res.results.docs as Author[];
        this.totalItems = res.results.total;
        this.pages = res.results.pages;
    },
      error=> this.errorMessage = <any> error
    );
  }


   public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getAuthors();
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
  }

  toggleAnimation(){
    console.log(this.listState);
    this.listState = this.listState === "out" ? "in" : "out";
  }

  addAuthor(){
    this.missionService.setInstructions("Newly created authors will be added to this page automatically.");
    this.childModal.show();
  }

  hideModal(boolean: Boolean){
    this.childModal.hide();
    this.missionService.setInstructions(this.instruct);
    this.getAuthors();
    // this.authorService.getAuthors()
    // .subscribe(
    //   res => {
    //     console.log(res.json());
    //     this.authors = res.results.docs as Author[];
    // },
    //   error=> this.errorMessage = <any> error
    // );
  }

  gotoAuthor(id: string){
    console.log(id);
    var url = "/authors/details/" + id;
    this.router.navigate([url]);
  }


}
