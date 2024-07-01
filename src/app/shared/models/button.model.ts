import { ButtonClasses } from "./button-classes.model";
import { ButtonType } from "./button-type.model";

export interface Button {
    icon?: string,
    title: string,
    actionType: ButtonType,
    isVisible: boolean,
    isDisables: boolean,
    onclick?: any,
    link?: any,
    classes?: ButtonClasses[],
}