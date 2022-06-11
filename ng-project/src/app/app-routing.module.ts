import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NewsScreenComponent } from './components/news/news-screen/news-screen.component';
import { NotesScreenComponent } from './components/notes/notes-screen/notes-screen.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';
import { SetupTimetableScreenComponent } from './components/timetable/setup-timetable-screen/setup-timetable-screen.component';
import { TimetableTableComponent } from './components/timetable/timetable-table/timetable-table.component';

const routes: Routes = [
  {
    "path": "",
    "component": HomePageComponent
  },
  {
    "path": "settings",
    "component": SettingsScreenComponent
  },
  {
    "path": "news",
    "component": NewsScreenComponent
  },
  {
    "path": "timetable",
    "component": TimetableTableComponent
  },
  {
    "path": "notes",
    "component": NotesScreenComponent
  },
  {
    "path": "upload_timetable_file",
    "component": SetupTimetableScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
