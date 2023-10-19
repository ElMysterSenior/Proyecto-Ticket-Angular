import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTramiteComponent } from './consultar-tramite.component';

describe('ConsultarTramiteComponent', () => {
  let component: ConsultarTramiteComponent;
  let fixture: ComponentFixture<ConsultarTramiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarTramiteComponent]
    });
    fixture = TestBed.createComponent(ConsultarTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
