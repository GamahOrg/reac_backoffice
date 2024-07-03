import { EventEmitter, Injectable, WritableSignal, signal } from '@angular/core';
import { NextAndPreviousButtons } from '@app/shared/models/next-and-previous-buttons.model';

@Injectable()
export class NextAndPreviusButtonsService {
  public nextButtonIsClicked : EventEmitter<null> = new EventEmitter()
  public saveAsDraftIsClicked : EventEmitter<null> = new EventEmitter()
  public moveToNextTab : EventEmitter<null> = new EventEmitter()
  public saveAsDraftBtnIsvisible: WritableSignal<boolean>= signal<boolean>(true)
  public buttons :WritableSignal<NextAndPreviousButtons> = signal<NextAndPreviousButtons>({} as NextAndPreviousButtons)
  constructor() { }
}
