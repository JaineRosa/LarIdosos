import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGenerico } from './card-generico';

describe('CardGenerico', () => {
  let component: CardGenerico;
  let fixture: ComponentFixture<CardGenerico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGenerico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGenerico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
