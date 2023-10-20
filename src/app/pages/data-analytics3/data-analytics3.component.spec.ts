import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalytics3Component } from './data-analytics3.component';

describe('DataAnalytics3Component', () => {
  let component: DataAnalytics3Component;
  let fixture: ComponentFixture<DataAnalytics3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAnalytics3Component]
    });
    fixture = TestBed.createComponent(DataAnalytics3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
