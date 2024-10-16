import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessCardComponent } from './components/add-business-card/business-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { BusinessCardListComponent } from './components/business-card-list/business-card-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExportCardComponent } from './components/export-card/export-card.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    BusinessCardComponent,
    HomeComponent,
    BusinessCardListComponent,
    DeleteCardComponent,
    ExportCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faFileExport);
  }
}
