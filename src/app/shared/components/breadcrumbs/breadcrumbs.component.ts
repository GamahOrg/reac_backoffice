import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Breadcrumb } from '@app/shared/models/breadcrumb.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
  _breadcrumbService = inject(BreadcrumbService)
  _injector = inject(Injector)
  breadcrumbList: Breadcrumb[] = []
  ngOnInit(): void {
    this.observeBreadcrumbList()
  }
  private observeBreadcrumbList(): void {
    effect(() => {
      this.breadcrumbList = this._breadcrumbService.breadcrumbList();
      console.log("this.breadcrumbList", this.breadcrumbList)
    }, {
      injector: this._injector,
      allowSignalWrites: true
    });
  }
  public trackByFn(index: number, item: Breadcrumb): any {
    return index.toString(); // Assuming each item has a unique 'id' property
  }

   public onBreadcrumbClick(event: Event, item: Breadcrumb): void {
    if (item.link === 'back') {
      event.preventDefault();
     window.history.back();
    }
  }
}
