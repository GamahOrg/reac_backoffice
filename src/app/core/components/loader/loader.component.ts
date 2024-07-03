import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '@app/core/services/loader/loader.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent extends BaseComponent implements OnInit  {
  private _loaderService= inject(LoaderService)
  showLoader: boolean = true;
  ngOnInit(): void {
    this.observeShowLoader();
  }
  private observeShowLoader():void{
    this._loaderService.showLoader.pipe(takeUntil(this.destroy$)).subscribe((loader: boolean) => {
      this.showLoader = loader;
      // this._changeDetectorRef.detectChanges();
    })
  }
}
