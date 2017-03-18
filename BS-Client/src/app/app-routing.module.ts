import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';


//IMporting COmponents
import {HomeComponent} from './home/home.component';

//Authors
import {AuthorsComponent } from './authors/authors.component';
import { AuthorsListComponent } from './authors/authors-list/authors-list.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';


const routes: Route[] = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {
        path: 'authors', component: AuthorsComponent,
        children: [
            {path: '', redirectTo:'list', pathMatch:'full'},
            {path: 'list', component: AuthorsListComponent},
            {path: 'details/:id', component: AuthorDetailsComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }