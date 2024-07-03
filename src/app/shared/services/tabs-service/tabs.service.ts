import { Injectable, Injector, Signal, WritableSignal, effect, signal } from '@angular/core';
import { Tabs } from '../../models/tabs.model';

@Injectable()
export class TabsService {
  public tabContent: WritableSignal<Tabs> = signal<Tabs>(new Tabs)
  public verticalTabContent: WritableSignal<Tabs> = signal<Tabs>(new Tabs)
  public activeTabIndex: WritableSignal<number> = signal<number>(0);
  public activeVerticalTabIndex: WritableSignal<number> = signal<number>(0);
  constructor() {}
  // update 
  public updateTabContent(tabs: Tabs): void {
    this.tabContent.set(tabs)
  }
  public updateVerticalTabContent(tabs: Tabs): void {
    this.verticalTabContent.set(tabs)
  }
  public updateActiveTabIndex(index: number): void {
    this.activeTabIndex.set(index)
  }
  public updateActiveVerticalTabIndex(index: number): void {
    this.activeVerticalTabIndex.set(index)
  }
  // get 
  // getTabContent(): Observable<Tabs> {
  //   return this.tabContent.asObservable()
  // }
  // getActiveVerticalTabIndex(): Observable<number> {
  //   return this.activeVerticalTabIndex.asObservable()
  // }
  // getVerticalTabContent(): Observable<Tabs> {
  //   return this.verticalTabContent.asObservable()
  // }
  // getActiveTabIndex(): Observable<number> {
  //   return this.activeTabIndex.asObservable()
  // }
  // reset 
  resetTabContent(): void {
    this.updateTabContent(new Tabs)
  }
  resetVerticalTabContent(): void {
    this.updateVerticalTabContent(new Tabs)
  }
}
