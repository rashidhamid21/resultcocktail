import { Cocktail } from "./../models/Cocktail.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CocktailService {
  cocktailSubject = new Subject<Cocktail>();
  cocktailSubjectSearchResult = new Subject<any>();

  constructor(private http: HttpClient) {}

  readonly endpoint: string = "https://www.thecocktaildb.com/api/json/v1/1/";

  getAlcoholicCocktails(): Observable<Cocktail[]> {
    console.log('1>>getAlcoholicCocktails');
    return this.http
      .get(this.endpoint + "filter.php?c=Cocktail")
      .pipe(map((data: any) => data.drinks.map(Cocktail.adapt)));
  }

  getAlcoholicCocktail(id: string) {
    console.log('2>>getAlcoholicCocktail');
    this.http
      .get(this.endpoint + "lookup.php?i=" + id)
      .pipe(map((data: any) => data.drinks.map(Cocktail.adapt)))
      .subscribe(res => {
        console.log(res);
        this.cocktailSubject.next(res[0]);
      });
  }


  getAllSearch(searchTerm: string, filterBy: string) {
    let endPoint; 
    if(filterBy === 'Name') {
      endPoint = this.endpoint + "search.php?s=" + searchTerm;
    } else if(filterBy === 'Category') {
      endPoint = this.endpoint + "filter.php?c=" + searchTerm;
    } else if(filterBy === 'Ingredient') {
      endPoint = this.endpoint + "filter.php?i=" + searchTerm;
    }
    this.returnFilterObservable(endPoint);
    
  }

  returnFilterObservable(endPoint){
    const emptyResults: Cocktail[] = [];
     this.http.get(endPoint)
     .pipe(map((data: any) => data.drinks.map(Cocktail.adapt)))
     .subscribe(data => {
      console.log(data);
      this.cocktailSubjectSearchResult.next(data);
    });
  }
}
