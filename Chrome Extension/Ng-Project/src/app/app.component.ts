import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Base Camp';

  onActivate():void{ // Every time the user visits a new page, scroll to the top leftz
    document.getElementById("sideBar")?.classList.remove("sidebar-extended");
  }
}
