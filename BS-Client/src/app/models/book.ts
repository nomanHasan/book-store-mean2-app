import {Author} from './author';

export class Book{
    public _id: string;
    public title: string;
    public isbn : Number;
    public pub_date: Date;
    public price: Number;
    public pub_house: string;
    public author: Author;
    public authorId: string;
    public coverImage: string;
}