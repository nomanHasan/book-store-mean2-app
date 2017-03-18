import { Observable } from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

// import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Book} from '../models/book';


@Injectable()
export class BookService{
    constructor(private http: Http){}

    public getBookUrl: string = 'api/books/';
    public postBookUrl: string = 'api/books/';

    getBooks(): Observable<Book[]>{
        return this.http.get(this.getBookUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getBooksByAuthor(id: string, page: number, limit: number): Observable<any>{
    var urlSearchParams  = new URLSearchParams();

    urlSearchParams.append('page', String(page));
    urlSearchParams.append('limit', String(limit));
    urlSearchParams.append('authorId', id);

    let body = urlSearchParams.toString();
    let getURL = this.getBookUrl +"?"+ body;

    console.log(getURL);
        return this.http.get(getURL)
        .map(res=>{
          console.log(res.json());
          return res.json() || {};
        })
        .catch(this.handleError);
    }

    addBookByAuthor(book: Book): Observable<Boolean>{

        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('title', book.title);
        
        urlSearchParams.append('isbn', String(book.isbn));
        urlSearchParams.append('pub_date', String(book.pub_date));
        urlSearchParams.append('price', String(book.price));
        urlSearchParams.append('pub_house', book.pub_house);
        urlSearchParams.append('authorId', book.authorId);

        let body = urlSearchParams.toString();
        console.log(this.postBookUrl + body);
        return this.http.post(this.postBookUrl, body, {headers: headers})
        .map(res=>{
            console.log(res.json());
            return res.json().success || false;
        })
        .catch(this.handleError);
    }

    editBookById(book: Book): Observable<Boolean>{

        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('title', book.title);
        
        urlSearchParams.append('isbn', String(book.isbn));
        urlSearchParams.append('pub_date', String(book.pub_date));
        urlSearchParams.append('price', String(book.price));
        urlSearchParams.append('pub_house', book.pub_house);
        urlSearchParams.append('authorId', book.authorId);

        let body = urlSearchParams.toString();
        console.log(this.postBookUrl + body);
        return this.http.put(this.postBookUrl+book._id, body, {headers: headers})
        .map(res=>{
            console.log(res.json());
            return res.json().success || false;
        })
        .catch(this.handleError);
    }
  
  private handleError (error: Response | any) {
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
