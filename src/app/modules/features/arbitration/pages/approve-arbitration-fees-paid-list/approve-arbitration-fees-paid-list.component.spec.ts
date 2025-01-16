/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApproveArbitrationFeesPaidListComponent } from './approve-arbitration-fees-paid-list.component';

describe('ApproveArbitrationFeesPaidListComponent', () => {
  let component: ApproveArbitrationFeesPaidListComponent;
  let fixture: ComponentFixture<ApproveArbitrationFeesPaidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveArbitrationFeesPaidListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveArbitrationFeesPaidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
