import { Component } from '@angular/core';
import { BehaviorSubject, first, map, Observable, Subject } from 'rxjs';
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
  backgrounds: BehaviorSubject<any> = new BehaviorSubject([]);
  backgrounds$:Observable<any> = this.backgrounds.asObservable();
  constructor(private colorService: ColorService) {
    this.backgrounds.next(this.getBackgrounds(0,5))
  }

  // backgroundMapper(page: number = 0, limit: number = 5) {
  //   this.colorService
  //     .getColors()
  //     .pipe(
  //       map((colors) => {
  //         return colors.splice(page * limit, limit);
  //       }),
  //       first()
  //     )
  //     .subscribe((data: any) => {
  //       this.backgrounds.push(...data);
  //     });
  // }
  onScroll() {
    this.page++;
    this.backgrounds.next([...this.backgrounds.value,...this.getBackgrounds(this.page,this.limit)])
  }

  getBackgrounds(page: number = 0, limit: number = 5){
    return this.colorService.getColorsFromJSON().splice(page * limit, limit)
  }
}
