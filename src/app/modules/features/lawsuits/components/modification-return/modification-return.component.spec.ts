import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationReturnComponent } from './modification-return.component';

describe('ModificationReturnComponent', () => {
  let component: ModificationReturnComponent;
  let fixture: ComponentFixture<ModificationReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
