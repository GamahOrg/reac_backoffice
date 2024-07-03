import { Component, Injector, Input, TemplateRef, ViewChild, ViewEncapsulation, effect, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsService } from '../../services/tabs-service/tabs.service';
import { Tabs } from '../../models/tabs.model';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// import { ModalService } from '@app/shared/services/modal/modal.service';
// import { translations } from 'translation-keys.enum';
// import { ButtonType } from '@app/shared/models/button-type.model';
// import { ButtonClasses } from '@app/shared/models/button-classes.model';

@Component({
    selector: 'app-tabs',
    standalone: true,
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss',
    imports: [CommonModule, MatTabsModule, TranslateModule]
})
export class TabsComponent extends BaseComponent {

    @Input() tabClassName?: string = '';

    public tabContent: Tabs = new Tabs();
    constructor(
        private _tabsService: TabsService,
        // private _modalService: ModalService,
        private _injector: Injector) {
        super();
    }
    ngOnInit(): void {
        this.observeTabsContent();
        this.observeActiveTabIndex();
    }

    private observeTabsContent(): void {
        effect(() => {
            this.tabContent = this._tabsService.tabContent();
            console.log("this.tabContent", this.tabContent)
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }
    private observeActiveTabIndex(): void {
        effect(() => {
            this.tabContent.activeTabIndex = this._tabsService.activeTabIndex();
            console.log("this.tabContent.activeTabIndex", this.tabContent.activeTabIndex)
            // if (this.tabContent.activeTabIndex === 0) this.restVerticalTabIndex()
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    // private restVerticalTabIndex(): void {
    //     // this._tabsService.updateActiveVerticalTabIndex(0)
    // }
    public updateActiveTabIndex(event: any) {
        this.tabContent.activeTabIndex = event.index;
        // this.restVerticalTabIndex()
        this._tabsService.updateActiveTabIndex(event.index)
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

    // isLastTab(): boolean {
    //     return this.tabContent.activeTabIndex === this.tabContent.tabsComponentList.length - 1;
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
}