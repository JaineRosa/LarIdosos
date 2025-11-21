import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCards } from './lista-cards';

describe('ListaCards', () => {
  let component: ListaCards;
  let fixture: ComponentFixture<ListaCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
