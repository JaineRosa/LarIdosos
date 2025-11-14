package com.example.LarIdosos.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * POJO para um Medicamento.
 * ESTA CLASSE É ANINHADA (EMBEDDED) DENTRO DO DOCUMENTO 'Idoso'.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicamento {

    // Usamos um ID interno para referenciar no agendamento
    private String medicamentoId = null;

    private String nome; // Ex: "Losartana 50mg"

    private String dosagem; // Ex: "1 comprimido"

    private String observacoes; // Ex: "Tomar após o café"
}