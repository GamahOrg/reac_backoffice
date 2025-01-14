import { Injectable, WritableSignal, signal } from '@angular/core';
import { Accordion } from '@app/shared/models/accordion.model';

@Injectable()
export class AccordionService {
  public accordionContent: WritableSignal<Accordion> = signal<Accordion>(new Accordion)

  constructor() { }

  updateAccordionContent(accordion: Accordion): void {
    this.accordionContent.set(accordion)
  }

  resetTabContent(): void {
    this.updateAccordionContent(new Accordion)
  }
}
