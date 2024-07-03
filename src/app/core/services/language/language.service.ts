import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Direction } from '../../models/enums/direction';
import { Language } from '../../models/enums/language';

@Injectable()
export class LanguageService {
  direction: BehaviorSubject<Direction> = new BehaviorSubject<Direction>(Direction.rtl)
  currentLang: BehaviorSubject<Language> = new BehaviorSubject<Language>(Language.ar)
  constructor(
    // private translate: TranslateService
    ) { }
  // update
  updateDirection(dir:Direction ): void {
    this.direction.next(dir)
    // this.translate.stream("direction").subscribe((dir: Direction) => {
    // })
  }
  updateCurrentLang(lang: Language): void {
    // this.translate.use(lang);
    this.currentLang.next(lang);
  }

  // observe
  observeDirection(): Observable<Direction> {
    return this.direction.asObservable()
  }
  observeCurrentLang(): Observable<Language> {
    return this.currentLang.asObservable()
  }
}
