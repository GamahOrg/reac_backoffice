import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitListComponent } from './lawsuits-list.component';

describe('LawsuitListComponent', () => {
  let component: LawsuitListComponent;
  let fixture: ComponentFixture<LawsuitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawsuitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
