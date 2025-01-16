/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApproveArbitrationFeesPaidDetailsComponent } from './approve-arbitration-fees-paid-details.component';

describe('ApproveArbitrationFeesPaidDetailsComponent', () => {
  let component: ApproveArbitrationFeesPaidDetailsComponent;
  let fixture: ComponentFixture<ApproveArbitrationFeesPaidDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveArbitrationFeesPaidDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveArbitrationFeesPaidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
