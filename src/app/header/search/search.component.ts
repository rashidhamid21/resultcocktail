import { CocktailService } from "./../../services/cocktail.service";
import { Cocktail } from "./../../models/Cocktail.model";
import { Subject } from "rxjs";
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  keyUp$ = new Subject<string>();
  isLoading = false;
  visible: boolean;
  foundDrinks: Cocktail[] = [];
  titleArray = ['Category', 'Name', 'Ingredient'];
  constructor(private cocktailSvc: CocktailService) {}
  filterBy = 'Category';//default filter
  searchTerm: string = 'margarita';

  ngOnInit() {
  }

  onEditClick(value) {
    this.filterBy = value;
  }

  getSearchText(value) {
    this.searchTerm = value;
  }

  getFilterSearch() {
    this.cocktailSvc.getAllSearch(this.searchTerm, this.filterBy)
  }

}
