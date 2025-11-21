import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';

// Tipos de campo suportados
type CampoTipo =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'select'
  | 'multi-select'
  | 'number'
  | 'textarea'
  | 'array';

interface Opcao {
  value: string;
  label: string;
}

export interface CampoConfig {
  nome: string;
  label: string;
  tipo: CampoTipo;
  placeholder?: string;
  validacao?: any[];
  opcoes?: Opcao[];
  arrayItemPlaceholder?: string;
}

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro.html',
  styleUrls: ['./form-cadastro.scss'],
})
export class FormCadastro implements OnChanges {
  @Input() campos: CampoConfig[] = [];
  @Input() initialValue: any = null;
  @Input() salvarLabel = 'Salvar';
  @Input() titulo?: string;
  @Input() exibirFoto: boolean = false;

  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.criarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
      this.criarFormulario();
    }
  }

  private criarFormulario(): void {
    const group: Record<string, any> = {};

    this.campos.forEach((c) => {
      if (c.tipo === 'array') {
        group[c.nome] = this.fb.array([]);
      } else {
        let valorInicial: any;

        if (c.tipo === 'multi-select') {
          valorInicial = Array.isArray(this.initialValue?.[c.nome])
            ? this.initialValue[c.nome]
            : [];
        } else {
          valorInicial = this.initialValue?.[c.nome] ?? '';
        }
        group[c.nome] = [valorInicial, c.validacao || []];
      }
    });

    group['foto'] = [this.initialValue?.foto ?? null];
    this.form = this.fb.group(group);

    this.fotoPreview = this.initialValue?.foto ?? null;

    this.campos
      .filter((c) => c.tipo === 'array')
      .forEach((c) => {
        const arr = this.form.get(c.nome) as FormArray;
        const valores = Array.isArray(this.initialValue?.[c.nome]) ? this.initialValue[c.nome] : [];
        valores.forEach((v: string) => arr.push(this.fb.control(v)));
      });
  }

  onFotoSelecionada(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.fotoPreview = reader.result);
      reader.readAsDataURL(file);
      this.form.patchValue({ foto: file });
    }
  }

  removerFoto(): void {
    this.fotoPreview = null;
    this.form.patchValue({ foto: null });
  }

  getControl(name: string): FormControl | null {
    return this.form.get(name) as FormControl | null;
  }

  getArray(name: string): FormArray<FormControl> {
    return this.form.get(name) as FormArray<FormControl>;
  }

  addArrayItem(name: string): void {
    this.getArray(name).push(new FormControl(''));
  }

  removeArrayItem(name: string, index: number): void {
    const arr = this.getArray(name);
    if (arr.length > index) {
      arr.removeAt(index);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.value);
  }
}
