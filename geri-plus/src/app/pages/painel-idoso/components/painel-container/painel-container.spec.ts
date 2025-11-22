import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelContainer } from './painel-container';

describe('PainelContainer', () => {
  let component: PainelContainer;
  let fixture: ComponentFixture<PainelContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
