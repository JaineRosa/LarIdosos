import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelHeader } from './painel-header';

describe('PainelHeader', () => {
  let component: PainelHeader;
  let fixture: ComponentFixture<PainelHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
