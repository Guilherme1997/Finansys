import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";

import {Observable,throwError} from "rxjs";
import {map,catchError,flatMap} from "rxjs/operators";

import {Category} from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) {}

  private url : string = "api/categories"; 

  getAll():Observable<Category[]>{
    return this.http.get(this.url).pipe(
      catchError(this.handlerError),
      map(this.jsonDataCategories)
    );
  }

  getById(id:number):Observable<Category>{
   const url = `${this.url}/${id}`;
   return this.http.get(url).pipe(
     catchError(this.handlerError),
     map(this.jsonDataCategory)
   )
  }

  create(category: Category):Observable<Category>{
    return this.http.post(this.url, category).pipe(
      catchError(this.handlerError),
      map(this.jsonDataCategory)
    );
  }

  update(category:Category):Observable<Category>{
    const url = `${this.url}/${category.id}`;
    return this.http.put(url,category).pipe(
      catchError(this.handlerError),
      map( ()=> category )
    );
  }

  delete(id:number):Observable<Category>{
    const url = `${this.url}/${id}`;
   return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map( ()=> null)
    );
  }

  private jsonDataCategories(jsonData:any[]) : Category[]{
    const categories: Category[] = [];
    jsonData.forEach(element=>  categories.push(element));
    return categories;
  }

  private jsonDataCategory(jsonData: any ) :Category{
    return jsonData as Category;
  }

  private handlerError(error:any):Observable<any>{
    console.log("ERRO NA REQUISIÇAO -> ", error);
    return throwError(error);
  }
  
}
