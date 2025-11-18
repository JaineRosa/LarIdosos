package com.example.LarIdosos.Models;


import com.example.LarIdosos.Models.Enum.StatusResidencia;
import com.example.LarIdosos.Models.Enum.TipoUsuario;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.User;


@Document(collection = "Usuario")
public class Usuario {

    @Id
    private String id;
    private String nome;
    private String quarto;
    private Binary fotoUrl;
    public TipoUsuario tipoUsuario;
    @Indexed(unique = true)
    public String email;
    private String telefone;
    private String senha;
    @Indexed(unique = true)
    private String cpf;
    private LocalDate dataNascimento;
    private String responsavelId;
    public StatusResidencia StatusResidencia;

    private List<String> notificacoesNaoLidas;

    private List<String> medicamentos;

    private List<String> recomendacoesMedicas;

    private List<String> cuidadoresId;

    public Usuario() {
    }

    public Usuario(String id, String nome, String quarto, Binary fotoUrl, TipoUsuario tipoUsuario, String email, String telefone, String senha, String cpf, LocalDate dataNascimento, String responsavelId, com.example.LarIdosos.Models.Enum.StatusResidencia statusResidencia, List<String> notificacoesNaoLidas, List<String> medicamentos, List<String> recomendacoesMedicas, List<String> cuidadoresId) {
        this.id = id;
        this.nome = nome;
        this.quarto = quarto;
        this.fotoUrl = fotoUrl;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.responsavelId = responsavelId;
        StatusResidencia = statusResidencia;
        this.notificacoesNaoLidas = notificacoesNaoLidas;
        this.medicamentos = medicamentos;
        this.recomendacoesMedicas = recomendacoesMedicas;
        this.cuidadoresId = cuidadoresId;
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

    public String getQuarto() {
        return quarto;
    }

    public void setQuarto(String quarto) {
        this.quarto = quarto;
    }

    public Binary getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(Binary fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(String responsavelId) {
        this.responsavelId = responsavelId;
    }

    public com.example.LarIdosos.Models.Enum.StatusResidencia getStatusResidencia() {
        return StatusResidencia;
    }

    public void setStatusResidencia(com.example.LarIdosos.Models.Enum.StatusResidencia statusResidencia) {
        StatusResidencia = statusResidencia;
    }

    public List<String> getNotificacoesNaoLidas() {
        return notificacoesNaoLidas;
    }

    public void setNotificacoesNaoLidas(List<String> notificacoesNaoLidas) {
        this.notificacoesNaoLidas = notificacoesNaoLidas;
    }

    public List<String> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<String> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public List<String> getRecomendacoesMedicas() {
        return recomendacoesMedicas;
    }

    public void setRecomendacoesMedicas(List<String> recomendacoesMedicas) {
        this.recomendacoesMedicas = recomendacoesMedicas;
    }

    public List<String> getCuidadoresId() {
        return cuidadoresId;
    }

    public void setCuidadoresId(List<String> cuidadoresId) {
        this.cuidadoresId = cuidadoresId;
    }

    public UserDetails toUserDetails() {
        return new User(this.email, this.senha, new ArrayList<>());
    }
}