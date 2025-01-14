import { Component, Injector, OnInit, effect, Signal, computed, signal } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { Tabs } from '../../models/tabs.model';
import { TabsService } from '../../services/tabs-service/tabs.service';
import { NextAndPreviusButtonsService } from '../../services/next-and-previus-buttons/next-and-previus-buttons.service';
import { combineLatest, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translations } from 'translation-keys.enum';
import { ButtonType } from '@app/shared/models/button-type.model';
import { ButtonClasses } from '@app/shared/models/button-classes.model';
@Component({
  selector: 'app-next-and-previus-buttons',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './next-and-previus-buttons.component.html',
  styleUrl: './next-and-previus-buttons.component.scss'
})
export class NextAndPreviusButtonsComponent extends BaseComponent implements OnInit {
  nextBtnIsVisible: boolean = false;
  previousBtnIsVisible: boolean = false;
  saveAsDraftBtnIsVisible: boolean = false;
  tabContent: Tabs | null = null;
  VerticalTabContent: Tabs | null = null;
  activeTabIndex: number = 0;
  activeVerticalTabIndex: number = 0;
  
  localization = {
    next: this._translate.instant(this.translations.actions.next),
    saveAsDraft: this._translate.instant(this.translations.actions.saveAsDraft),
    previous: this._translate.instant(this.translations.actions.previous),
  };
  availabilityToUpdate: boolean = false;
  constructor(
    private _tabsService: TabsService,
    private _nextAndPreviusButtonsService: NextAndPreviusButtonsService,
    private _injector: Injector,
    private _translate: TranslateService
  ) {
    super();
  }
  ngOnInit(): void {
    this.observeTabsContent();
    this.observeMoveToNextTab();
    this.ObserveSaveAsDraftBtnIsvisible();
    // this.getAvailabilityToUpdateFromLocalStorage()
  }
  // private getAvailabilityToUpdateFromLocalStorage(): void {
  //   this.availabilityToUpdate = true;
  //   if (this.availabilityToUpdate) {
  //     this.localization.saveAsDraft = this._translate.instant(this.translations.actions.save)
  //   }
  // }

  private ObserveSaveAsDraftBtnIsvisible() {
    effect(() => {
      this.saveAsDraftBtnIsVisible = this._nextAndPreviusButtonsService.saveAsDraftBtnIsvisible();
      console.log("this.saveAsDraftBtnIsVisible", this.saveAsDraftBtnIsVisible)
    }, {
      injector: this._injector,
      allowSignalWrites: true
    });
  }

  private observeTabsContent(): void {
    const horziontalِAndVerticalTab = signal({ horziontalTabContent: this._tabsService.tabContent(), verticalTabContent: this._tabsService.verticalTabContent() });
    effect(() => {
      console.log(horziontalِAndVerticalTab().horziontalTabContent);
      console.log(horziontalِAndVerticalTab().verticalTabContent)
      this.tabContent = horziontalِAndVerticalTab().horziontalTabContent;
      this.VerticalTabContent = horziontalِAndVerticalTab().verticalTabContent;
      this.updateActiveTabIndex();
      this.updatePreviousBtnIsVisible();
      this.updateNextBtnIsVisible();
    }, {
      injector: this._injector,
      allowSignalWrites: true
    }
    )
  }
  private updateActiveTabIndex(): void {
    this.activeTabIndex = this.tabContent?.activeTabIndex as number;
    // this.activeVerticalTabIndex = this.VerticalTabContent?.activeTabIndex as number;
  }
  private updatePreviousBtnIsVisible(): void {
    this.previousBtnIsVisible = this.tabContent?.activeTabIndex == 0 && this.VerticalTabContent?.activeTabIndex == 0 ? false : true;
  }
  private updateNextBtnIsVisible(): void {
    let lastHorizontalTabIndex = this.tabContent?.tabsComponentList && this.tabContent?.tabsComponentList.length - 1
    // let lastVerticalTabIndex = this.VerticalTabContent?.tabsComponentList && this.VerticalTabContent?.tabsComponentList.length - 1
    // this.nextBtnIsVisible = this.tabContent?.activeTabIndex == lastHorizontalTabIndex && this.VerticalTabContent?.activeTabIndex == lastVerticalTabIndex ? false : true;
    this.nextBtnIsVisible = this.tabContent?.activeTabIndex == lastHorizontalTabIndex ? false : true;
  }

  observeMoveToNextTab(): void {
    this._nextAndPreviusButtonsService.moveToNextTab.pipe(takeUntil(this.destroy$)).subscribe((res: null) => {
      this._tabsService.updateActiveTabIndex(this.activeTabIndex + 1);
    })
  }

  public next(): void {
    this._nextAndPreviusButtonsService.nextButtonIsClicked.emit()
  }
  public saveAsDraft(): void {
    this._nextAndPreviusButtonsService.saveAsDraftIsClicked.emit()
  }
  public back(): void {
    // if (this.VerticalTabContent?.activeTabIndex == 0) {
      this._tabsService.updateActiveTabIndex(this.activeTabIndex - 1);
    // } else {
    //   this._tabsService.updateActiveVerticalTabIndex(this.activeVerticalTabIndex - 1);
    // }
  }


  // nextTab() {
  //     if (this.isLastTab()) {
  //         this.openSuccessModal;
  //     } else {
  //         this.tabContent.activeTabIndex++;
  //     }
  // }

  // previousTab() {
  //     if (this.tabContent.activeTabIndex > 0) {
  //         this.tabContent.activeTabIndex--;
  //     }
  // }

  // openDraftModal() {
  //     this._modalService.open({
  //         icon: 'assets/images/icons/success.svg',
  //         title: translations.lawsuits.createEditLawsuit.lawsuitSavedAsDraft,
  //         buttons: [
  //             {
  //                 title: translations.actions.done,
  //                 actionType: ButtonType.cancel,
  //                 isDisables: false,
  //                 isVisible: true,
  //                 classes: [ButtonClasses.primary]
  //             }
  //         ]
  //     });
  // }

  // openSuccessModal() {
  //     this._modalService.openSuccessModal();
  // }

  // isLastTab(): boolean {
  //     return this.tabContent.activeTabIndex === this.tabContent.tabsComponentList.length - 1;
  // }
}
