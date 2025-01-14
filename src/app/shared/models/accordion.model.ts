import { Type } from "@angular/core";

export class Accordion {
    accordionComponentList: IAccordionComponent[] = [];
}

export interface IAccordionComponent {
    id?: string,
    icon: string,
    title: string,
    isVisible: boolean
    component?: Type<any> | null,
    disabled?: boolean,
    isRendered?: boolean,
    isViewed?: boolean,
    isOpen?: boolean,
}