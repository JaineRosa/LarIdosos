package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.DTO.MedicamentoDTO;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.AgendamentoMedicamentoRepository;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AgendamentoMedicamentoRepository agendamentoRepository;

    public Medicamento buscarPorId(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com ID: " + id));
    }
    public List<Medicamento> listarTodos() {
        return medicamentoRepository.findAll();
    }

    public List<Medicamento> listarPorIdoso(String idosoId) {
        return medicamentoRepository.findByIdosoId(idosoId);
    }

    public List<Medicamento> listarPorMedico(String medicoId) {
        return medicamentoRepository.findByMedicoId(medicoId);
    }


    public Medicamento cadastrarMedicamento(MedicamentoDTO dto) {

        Medicamento medicamento = new Medicamento();
        medicamento.setId(dto.getId()); // Será null para POST
        medicamento.setNome(dto.getNome());
        medicamento.setDosagem(dto.getDosagem());
        medicamento.setViaAdministracao(dto.getViaAdministracao());
        medicamento.setObservacoes(dto.getObservacoes());

        medicamento.setIdosoId(null);
        medicamento.setMedicoId(null);
        medicamento.setDataPrescricao(null);

        return medicamentoRepository.save(medicamento);
    }

    public Medicamento atualizarMedicamento(String id, Medicamento medicamentoAtualizado) {
        Medicamento medExistente = buscarPorId(id);

        if (medicamentoAtualizado.getNome() != null) {
            medExistente.setNome(medicamentoAtualizado.getNome());
        }
        if (medicamentoAtualizado.getDosagem() != null) {
            medExistente.setDosagem(medicamentoAtualizado.getDosagem());
        }
        if (medicamentoAtualizado.getFrequenciaDiaria() != null) {
            medExistente.setFrequenciaDiaria(medicamentoAtualizado.getFrequenciaDiaria());
        }
        if (medicamentoAtualizado.getDuracaoTratamento() != null) {
            medExistente.setDuracaoTratamento(medicamentoAtualizado.getDuracaoTratamento());
        }
        if (medicamentoAtualizado.getViaAdministracao() != null) {
            medExistente.setViaAdministracao(medicamentoAtualizado.getViaAdministracao());
        }
        if (medicamentoAtualizado.getObservacoes() != null) {
            medExistente.setObservacoes(medicamentoAtualizado.getObservacoes());
        }

        return medicamentoRepository.save(medExistente);
    }

    public void deletarMedicamento(String id) {
        Medicamento medicamento = buscarPorId(id);

        if (medicamento.getAgendamentosId() != null && !medicamento.getAgendamentosId().isEmpty()) {
            agendamentoRepository.deleteAllById(medicamento.getAgendamentosId());
        }

        Usuario idoso = usuarioRepository.findById(medicamento.getIdosoId()).orElse(null);
        if (idoso != null && idoso.getMedicamentos() != null) {
            idoso.getMedicamentos().remove(medicamento.getId());
            usuarioRepository.save(idoso);
        }

        medicamentoRepository.delete(medicamento);
    }
}