package com.example.LarIdosos.Models.DTO;

import com.example.LarIdosos.Models.Enum.ViaAdmMecidacao;

public class MedicamentoDTO {

    private String id;
    private String nome;
    private String dosagem;
    private ViaAdmMecidacao viaAdministracao;
    private String observacoes;

    public MedicamentoDTO(String id, String nome, String dosagem, ViaAdmMecidacao viaAdministracao, String observacoes) {
        this.id = id;
        this.nome = nome;
        this.dosagem = dosagem;
        this.viaAdministracao = viaAdministracao;
        this.observacoes = observacoes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDosagem() {
        return dosagem;
    }

    public void setDosagem(String dosagem) {
        this.dosagem = dosagem;
    }

    public ViaAdmMecidacao getViaAdministracao() {
        return viaAdministracao;
    }

    public void setViaAdministracao(ViaAdmMecidacao viaAdministracao) {
        this.viaAdministracao = viaAdministracao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
