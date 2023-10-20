import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalytics2Component } from './data-analytics2.component';

describe('DataAnalytics2Component', () => {
  let component: DataAnalytics2Component;
  let fixture: ComponentFixture<DataAnalytics2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataAnalytics2Component]
    });
    fixture = TestBed.createComponent(DataAnalytics2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
