import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

// import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Author } from '../models/author';


@Injectable()
export class AuthorService {
    constructor(private http: Http) { }

    public getAuthorUrl: string = 'api/authors/';
    public postAuthorUrl: string = 'api/authors/';

    getAuthors(page: number, limit: number): Observable<any> {
        var urlSearchParams  = new URLSearchParams();

        urlSearchParams.append('page', String(page));
        urlSearchParams.append('limit', String(limit));

        let body = urlSearchParams.toString();
        let getURL = this.getAuthorUrl +"?"+ body;
        
        return this.http.get(getURL)
            .map((res: Response)=>{
                console.log(res.json());
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.results.docs || {};
    }
    getAuthorById(id: string): Observable<Author> {
        return this.http.get(this.getAuthorUrl + id)
            .map((res: Response) => {
                return res.json().results;
            }
            )
            .catch(this.handleError);
    }
    addAuthor(author: Author): Observable<Boolean>{

        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('firstName', author.firstName);
        
        urlSearchParams.append('lastName', author.lastName);
        urlSearchParams.append('initials', author.initials);
        urlSearchParams.append('zip_code', String(author.zip_code));
        urlSearchParams.append('address', author.address);
        urlSearchParams.append('country', author.country);

        let body = urlSearchParams.toString();

        return this.http.post(this.postAuthorUrl, body, {headers: headers})
        .map(res=>{
            return res.json().success || false;
        })
        .catch(this.handleError);
    }

    editAuthor(author: Author){
        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('firstName', author.firstName);
        urlSearchParams.append('lastName', author.lastName);
        urlSearchParams.append('initials', author.initials);
        urlSearchParams.append('zip_code', String(author.zip_code));
        urlSearchParams.append('address', author.address);
        urlSearchParams.append('country', author.country);

        let body = urlSearchParams.toString();

        return this.http.put(this.postAuthorUrl+author._id, body, {headers: headers})
        .map(res=>{
            return res.json().success || false;
        })
        .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
