import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalytics4Component } from './data-analytics4.component';

describe('DataAnalytics4Component', () => {
  let component: DataAnalytics4Component;
  let fixture: ComponentFixture<DataAnalytics4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAnalytics4Component]
    });
    fixture = TestBed.createComponent(DataAnalytics4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
