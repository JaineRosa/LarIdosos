package com.example.LarIdosos.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Usuario")
public class Usuario {

    @Id
    private String id;
    private String nome;
    private String quarto;
    private Binary fotoUrl;

    // --- Referências ---

    /**
     * O ID (String) do Cuidador que é o Responsável Legal/Principal.
     * Este é o contato primário para emergências.
     */
    private String responsavelIdRef;

    /**
     * Lista de TODOS os IDs (String) que podem acessar este prontuário
     * (incluindo o responsável, enfermeiros, outros familiares).
     */
    private List<Cuidador> cuidadores;

    private List<Medicamento> medicamentos;

    private List<AgendamentoMedicamento> agendamentos;

    private List<RecomendacaoMedica> recomendacoes;
}