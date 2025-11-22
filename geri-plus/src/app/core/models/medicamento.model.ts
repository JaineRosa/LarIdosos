interface MedicamentoModel {
  id: string;
  nome: string;
  dosagem?: string;
  frequenciaDiaria?: string;
  duracaoTratamento?: string;
 viaAdministracao: 'ORAL' | 'INJETAVEL' | 'TOPICA' | 'INALATORIA' | 'RETAL' | 'VAGINAL' | 'OUTRA'; 
  observacoes?: string;
  dataPrescricao?: string;
  medicoId?: string;
  idosoId?: string;
  agendamentosId?: string[];
}