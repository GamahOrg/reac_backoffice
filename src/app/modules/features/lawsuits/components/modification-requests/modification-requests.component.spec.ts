import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationRequestsComponent } from './modification-requests.component';

describe('ModificationRequestsComponent', () => {
  let component: ModificationRequestsComponent;
  let fixture: ComponentFixture<ModificationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
