import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NotesScreenComponent } from './components/notes/notes-screen/notes-screen.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';
import { InitUserComponent } from './components/setup/init-user/init-user.component';
import { NewStudyNoteComponent } from './components/study-notes/new-study-note/new-study-note.component';
import { StudyNotesPageComponent } from './components/study-notes/study-notes-page/study-notes-page.component';
import { ViewStudyNotesComponent } from './components/study-notes/view-study-notes/view-study-notes.component';
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
    "path": "timetable",
    "component": TimetableTableComponent
  },
  {
    "path": "study_notes",
    "component": StudyNotesPageComponent
  },
  {
    "path": "study_notes/new",
    "component": NewStudyNoteComponent
  },
  {
    "path": "study_notes/new/:index",
    "component": NewStudyNoteComponent
  },
  {
    "path": "study_notes/view",
    "component": ViewStudyNotesComponent
  },
  {
    "path": "notes",
    "component": NotesScreenComponent
  },
  {
    "path": "upload_timetable_file",
    "component": SetupTimetableScreenComponent
  },
  {
    "path": "setup/user",
    "component": InitUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
