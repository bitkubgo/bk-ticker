import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAndTickerComponent } from './dashboard-and-ticker.component';

describe('DashboardAndTickerComponent', () => {
  let component: DashboardAndTickerComponent;
  let fixture: ComponentFixture<DashboardAndTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAndTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAndTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
