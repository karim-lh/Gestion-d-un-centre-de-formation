import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsformationsComponent } from './sessionsformations.component';

describe('SessionsformationsComponent', () => {
  let component: SessionsformationsComponent;
  let fixture: ComponentFixture<SessionsformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionsformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
