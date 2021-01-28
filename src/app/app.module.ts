import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardShellComponent } from './dashboard-shell/dashboard-shell.component';
import { CocktailListComponent } from './dashboard/cocktail-list/cocktail-list.component';
import { CocktailDetailComponent } from './dashboard/cocktail-detail/cocktail-detail.component';
import { SearchComponent } from './header/search/search.component';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

const routes: Routes = [
  { path: '', component: DashboardShellComponent, pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardShellComponent,
    CocktailListComponent,
    CocktailDetailComponent,
    SearchComponent,
    ClickedOutsideDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule, ClickedOutsideDirective]
})
export class AppModule { }
