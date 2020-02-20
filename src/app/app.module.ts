import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddPersonComponent } from './home/add-person/add-person.component';
import { PersonComponent } from './home/person/person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonComponent,
    AddPersonComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    InfiniteScrollModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
