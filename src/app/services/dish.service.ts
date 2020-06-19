import { Injectable } from '@angular/core';
import {DISHES} from '../shared/dishes';
import {Dish} from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  getdishes():Dish[]{
    return DISHES;
  }
  constructor() { }
}
