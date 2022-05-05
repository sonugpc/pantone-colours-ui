import { Component } from '@angular/core';
import {
  first,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { ColorService, RawColors } from 'src/services/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pantone World';
  page: number = 0;
  limit: number = 5;
  backgrounds: Array<RawColors> = new Array();
  constructor(private colorService: ColorService) {
    this.backgroundMapper(this.page, this.limit);
  }

  backgroundMapper(page: number = 0, limit: number = 5) {
    this.colorService
      .getColors()
      .pipe(
        map((colors) => {
          return colors.splice(page * limit, limit);
        }),
        first()
      )
      .subscribe((data: any) => {
        this.backgrounds.push(...data);
      });
  }
  onScroll() {
    this.page++;
    this.backgroundMapper(this.page, this.limit);
  }
}
