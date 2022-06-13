import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { TINYMCE_SCRIPT_SRC, EditorModule } from "@tinymce/tinymce-angular";

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { HomePageComponent } from './components/home/home-page/home-page.component';
import { SidebarComponentComponent } from './components/ui-components/sidebar/sidebar-component/sidebar-component.component';
import { SidebarToggleComponent } from './components/ui-components/sidebar/sidebar-toggle/sidebar-toggle.component';
import { TimetableTableComponent } from './components/timetable/timetable-table/timetable-table.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';
import { HeadingComponentComponent } from './components/ui-components/heading-component/heading-component.component';
import { NewFileComponent } from './components/settings/new-file/new-file.component';
import { LoadingWheelComponent } from './components/ui-components/loading-wheel/loading-wheel.component';
import { IpChangerComponent } from './components/settings/ip-changer/ip-changer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations' ;
import { SetupTimetableScreenComponent } from './components/timetable/setup-timetable-screen/setup-timetable-screen.component';
import { TimetableDayComponent } from './components/timetable/timetable-day/timetable-day.component';
import { ToggleSwitchComponent } from './components/ui-components/toggle-switch/toggle-switch.component';
import { TimetableColumnComponent } from './components/widgets/timetable-column/timetable-column.component';
import { NotesScreenComponent } from './components/notes/notes-screen/notes-screen.component';
import { TextInputComponent } from './components/ui-components/text-input/text-input.component';
import { CategoriesListComponent } from './components/ui-components/categories-list/categories-list.component';
import { DaySpinnerComponent } from './components/widgets/day-spinner/day-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidebarComponentComponent,
    SidebarToggleComponent,
    TimetableTableComponent,
    SettingsScreenComponent,
    HeadingComponentComponent,
    NewFileComponent,
    LoadingWheelComponent,
    IpChangerComponent,
    SetupTimetableScreenComponent,
    TimetableDayComponent,
    ToggleSwitchComponent,
    TimetableColumnComponent,
    NotesScreenComponent,
    TextInputComponent,
    CategoriesListComponent,
    DaySpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    KtdGridModule,
    EditorModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
