import { Component } from '@angular/core';
import { Tabs } from '../../../../shared/models/tabs.model';
import { TabsService } from '../../../../shared/services/tabs-service/tabs.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',

})
export class LayoutComponent {
  // tabContent: Tabs = {
  //   verticalTabs: false,
  //   activeTabIndex: 0,
  //   tabsComponentList: [
  //     {
  //       icon: '',
  //       title: "projectInformation",
  //       Component: null,
  //       disabled: false,
  //       isVisible: true,
  //     },
  //     {
  //       icon: '',
  //       title: "timeSchedule",
  //       Component: null,
  //       disabled: false,
  //       isVisible: true,
  //     },
  //     {
  //       icon: '',
  //       title: "plannedEngineeringSupervisionReports",
  //       Component: null,
  //       disabled: false,
  //       isVisible: true,
  //     },
  //   ],
  // };
  constructor(private _tabsService: TabsService,){}
  ngOnInit(): void {
    // this.updateTabContent(); 
  }
  // private updateTabContent(): void {
    
  //   this._tabsService.updateTabContent(this.tabContent);
  // }
}
