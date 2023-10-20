import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalytics5Component } from './data-analytics5.component';

describe('DataAnalytics5Component', () => {
  let component: DataAnalytics5Component;
  let fixture: ComponentFixture<DataAnalytics5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAnalytics5Component]
    });
    fixture = TestBed.createComponent(DataAnalytics5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
