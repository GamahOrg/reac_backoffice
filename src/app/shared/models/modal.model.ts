import { Button } from "./button.model";

export interface ModalData {
    icon: string | null,
    title: string,
    buttons?: Button[],
}