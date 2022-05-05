import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollerDirective } from 'src/directives/infinite-scroller.directive';

@NgModule({
  declarations: [
    AppComponent,
  InfiniteScrollerDirective ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
