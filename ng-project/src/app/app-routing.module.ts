import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NewsScreenComponent } from './components/news/news-screen/news-screen.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
