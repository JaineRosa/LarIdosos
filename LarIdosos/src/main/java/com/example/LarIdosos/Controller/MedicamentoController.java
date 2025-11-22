package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.DTO.MedicamentoDTO;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    @PostMapping
    public ResponseEntity<?> criarMedicamento(@RequestBody MedicamentoDTO dto) {
        try {
            Medicamento novoMedicamento = medicamentoService.cadastrarMedicamento(dto);
            return new ResponseEntity<>(novoMedicamento, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Medicamento>> listarTodos() {
        return ResponseEntity.ok(medicamentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicamento> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(medicamentoService.buscarPorId(id));
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<List<Medicamento>> listarPorIdoso(@PathVariable String idosoId) {
        return ResponseEntity.ok(medicamentoService.listarPorIdoso(idosoId));
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<Medicamento>> listarPorMedico(@PathVariable String medicoId) {
        return ResponseEntity.ok(medicamentoService.listarPorMedico(medicoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarMedicamento(@PathVariable String id, @RequestBody Medicamento medicamento) {
        try {
            Medicamento medAtualizado = medicamentoService.atualizarMedicamento(id, medicamento);
            return ResponseEntity.ok(medAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarMedicamento(@PathVariable String id) {
        try {
            medicamentoService.deletarMedicamento(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}