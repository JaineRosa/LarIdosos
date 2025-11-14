package com.example.LarIdosos.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;

/**
 * Representa um Cuidador (familiar, enfermeiro) na coleção 'cuidadores'.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cuidador {

    private String nome;

    private Binary fotoUrl;

    private String tipoParentesco; // Ex: "FILHO", "ENFERMEIRO"

    private String telefoneNotificacao;

    private String emailNotificacao;
}