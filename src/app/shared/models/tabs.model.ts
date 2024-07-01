import { Type } from "@angular/core"

export class Tabs {
  verticalTabs: boolean = false;
  activeTabIndex: number = 0;
  tabTitle?: string;
  tabsComponentList: tabsComponent[] = [];
}
export interface tabsComponent {
  icon: string,
  title: string,
  Component?: Type<any> | null,
  disabled: boolean,
  isVisible: boolean
  id?: string,
  errNum?: number,
  tabCode?: string
  tabErrors?: tabError[],
}
export interface tabError {
  errorCode: string;
  errorMessage: string;
}