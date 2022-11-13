import { TestBed } from '@angular/core/testing';

import { AgregarCarritoService } from './agregar-carrito.service';

describe('AgregarCarritoService', () => {
  let service: AgregarCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});