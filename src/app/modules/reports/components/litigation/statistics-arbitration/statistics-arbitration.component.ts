import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-statistics-arbitration',
  templateUrl: './statistics-arbitration.component.html',
  styleUrl: './statistics-arbitration.component.scss'
})
export class StatisticsArbitrationComponent extends BaseComponent implements OnInit  {
@Input() reportData: any;
  constructor(

  ) {
    super();
    
  }

  ngOnInit(): void {
  
  }
}
