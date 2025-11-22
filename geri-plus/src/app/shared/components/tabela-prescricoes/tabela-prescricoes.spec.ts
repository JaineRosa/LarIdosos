import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrescricoes } from './tabela-prescricoes';

describe('TabelaPrescricoes', () => {
  let component: TabelaPrescricoes;
  let fixture: ComponentFixture<TabelaPrescricoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPrescricoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPrescricoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
