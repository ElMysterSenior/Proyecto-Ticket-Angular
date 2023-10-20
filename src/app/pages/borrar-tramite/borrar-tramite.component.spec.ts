import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarTramiteComponent } from './borrar-tramite.component';

describe('BorrarTramiteComponent', () => {
  let component: BorrarTramiteComponent;
  let fixture: ComponentFixture<BorrarTramiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarTramiteComponent]
    });
    fixture = TestBed.createComponent(BorrarTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
