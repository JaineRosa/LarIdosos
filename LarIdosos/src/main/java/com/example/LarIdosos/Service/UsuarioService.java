package com.example.LarIdosos.Service;

import com.example.LarIdosos.Config.RabbitMQConfig;
import com.example.LarIdosos.Models.DTO.EmailNotificationDto;
import com.example.LarIdosos.Models.Enum.TipoUsuario;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com e-mail: " + email));

        return new User(usuario.getEmail(), usuario.getSenha(), new ArrayList<>());
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(String id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com E-mail: " + email));
    }

    public List<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.buscarPorNome(nome);
    }

    public List<Usuario> listarPorTipo(TipoUsuario tipo) {
        return usuarioRepository.findByTipoUsuario(tipo);
    }

    public Usuario criarUsuario(Usuario usuario) {

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Erro: E-mail já cadastrado!");
        }
        if (usuarioRepository.findByCpf(usuario.getCpf()).isPresent()) {
            throw new RuntimeException("Erro: CPF já cadastrado!");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        EmailNotificationDto notificationDto = new EmailNotificationDto(
                usuarioSalvo.getEmail(),
                "Bem-vindo ao Lar de Idosos!",
                "Olá " + usuarioSalvo.getNome() + ", seu cadastro foi realizado com sucesso."
        );

        System.out.println("[Produtor LarIdosos] Enviando DTO para Exchange '" + RabbitMQConfig.EXCHANGE_NAME + "' com a chave '" + RabbitMQConfig.EMAIL_WELCOME_QUEUE + "'");


        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.EMAIL_WELCOME_QUEUE,
                notificationDto
        );

        System.out.println("Mensagem enviada com sucesso.");

        return usuarioSalvo;
    }

    public Usuario atualizarUsuario(String id, Usuario usuarioAtualizado) {

        Usuario usuarioExistente = buscarPorId(id);

        if (usuarioAtualizado.getEmail() != null && !usuarioExistente.getEmail().equals(usuarioAtualizado.getEmail())) {
            if (usuarioRepository.findByEmail(usuarioAtualizado.getEmail()).isPresent()) {
                throw new RuntimeException("Erro: E-mail já cadastrado em outra conta!");
            }
            usuarioExistente.setEmail(usuarioAtualizado.getEmail());
        }

        if (usuarioAtualizado.getCpf() != null && !usuarioExistente.getCpf().equals(usuarioAtualizado.getCpf())) {
            if (usuarioRepository.findByCpf(usuarioAtualizado.getCpf()).isPresent()) {
                throw new RuntimeException("Erro: CPF já cadastrado em outra conta!");
            }
            usuarioExistente.setCpf(usuarioAtualizado.getCpf());
        }
        if (usuarioAtualizado.getNome() != null) {
            usuarioExistente.setNome(usuarioAtualizado.getNome());
        }
        if (usuarioAtualizado.getTelefone() != null) {
            usuarioExistente.setTelefone(usuarioAtualizado.getTelefone());
        }
        if (usuarioAtualizado.getQuarto() != null) {
            usuarioExistente.setQuarto(usuarioAtualizado.getQuarto());
        }
        if (usuarioAtualizado.getTipoUsuario() != null) {
            usuarioExistente.setTipoUsuario(usuarioAtualizado.getTipoUsuario());
        }
        if (usuarioAtualizado.getDataNascimento() != null) {
            usuarioExistente.setDataNascimento(usuarioAtualizado.getDataNascimento());
        }
        if (usuarioAtualizado.getResponsavelId() != null) {
            usuarioExistente.setResponsavelId(usuarioAtualizado.getResponsavelId());
        }
        if (usuarioAtualizado.getFotoUrl() != null) {
            usuarioExistente.setFotoUrl(usuarioAtualizado.getFotoUrl());
        }
        return usuarioRepository.save(usuarioExistente);
    }

    public void alterarSenha(String id, String novaSenha) {
        if (novaSenha == null || novaSenha.isEmpty()) {
            throw new RuntimeException("A nova senha não pode ser nula ou vazia.");
        }
        Usuario usuario = buscarPorId(id);
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
    }

    public void deletarUsuario(String id) {
        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }
}

