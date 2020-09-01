import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerTableComponent } from './ticker-table.component';

describe('TickerTableComponent', () => {
  let component: TickerTableComponent;
  let fixture: ComponentFixture<TickerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
