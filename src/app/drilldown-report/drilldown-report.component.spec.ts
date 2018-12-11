import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrilldownReportComponent } from './drilldown-report.component';

describe('DrilldownReportComponent', () => {
  let component: DrilldownReportComponent;
  let fixture: ComponentFixture<DrilldownReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrilldownReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrilldownReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
