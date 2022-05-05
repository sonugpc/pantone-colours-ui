import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import colours from '../assets/pantone.json'
export interface RawColors {
  name: string;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(public htmlClient: HttpClient) {}

  getColors(): Observable<RawColors[]> {
    return this.htmlClient
      .get('./assets/pantone.json')
      .pipe(
        map((e: any) =>
          e['names'].map((name: string, index: number) => ({
            name,
            value: e.values[index],
          }))
        )
      );
  }

  /**
   * Gets Colours from JSON File without HTTPCLIENT
   * @returns  Colours Array
   */
  getColorsFromJSON(){
      return colours['names'].map((name:string,index:number)=>({name,value:colours['values'][index]}))
  }
}
