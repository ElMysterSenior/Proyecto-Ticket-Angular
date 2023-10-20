import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTramiteComponent } from './modificar-tramite.component';

describe('ModificarTramiteComponent', () => {
  let component: ModificarTramiteComponent;
  let fixture: ComponentFixture<ModificarTramiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarTramiteComponent]
    });
    fixture = TestBed.createComponent(ModificarTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
