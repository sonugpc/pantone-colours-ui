import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroller]',
})
export class InfiniteScrollerDirective {
  @Output() scrolled = new EventEmitter<Boolean>();
  destroy:Subject<any> = new Subject(); // to unsubscribe the Observable
  destroy$ = this.destroy.asObservable();
  constructor() {
    fromEvent(window, 'scroll').pipe(debounceTime(100), takeUntil(this.destroy$)) //used debounceTime so that it does not rain events and emit only 1 in 500ms
			.subscribe((e: Event) => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) { // substracting 100 so that it call api before user reaches to bottom of 5th background
          this.scrolled.emit(true);
        }
      });
  }
  // @HostListener('window:scroll') onScroll(e: Event): void {
   //alternative that we could use in place of fromevent
  // }

  getScrollPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
}
}
