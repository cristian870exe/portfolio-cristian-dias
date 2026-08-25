// =========================================================
// ANO DINÂMICO NO RODAPÉ
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// MENU RESPONSIVO — abre/fecha o menu em telas pequenas
// =========================================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha o menu automaticamente ao clicar em um link (útil no celular)
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// TEMA CLARO/ESCURO
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
});

// =========================================================
// EFEITO DE "DIGITAÇÃO" NO TERMINAL DO HERO
// Reforça a assinatura visual da página sem exagerar na animação
// =========================================================
const typedOut = document.getElementById('typedOut');
const mensagemFinal = '-- Cristian, estagiário em dados';
let i = 0;

function digitar() {
  if (i <= mensagemFinal.length) {
    typedOut.textContent = mensagemFinal.slice(0, i);
    i++;
    setTimeout(digitar, 45);
  }
}

// Respeita usuários que preferem menos animação
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (semAnimacao) {
  typedOut.textContent = mensagemFinal;
} else {
  setTimeout(digitar, 600);
}

// =========================================================
// FORMULÁRIO DE CONTATO — validação e envio simulado
// =========================================================
const form = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

const campos = {
  nome: { input: document.getElementById('nome'), erro: document.getElementById('erroNome') },
  email: { input: document.getElementById('email'), erro: document.getElementById('erroEmail') },
  mensagem: { input: document.getElementById('mensagem'), erro: document.getElementById('erroMensagem') }
};

// Expressão simples para validar formato de e-mail (usuario@dominio.com)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function marcarErro(campo, mensagem) {
  campo.input.closest('.form__field').classList.add('form__field--invalid');
  campo.erro.textContent = mensagem;
}

function limparErro(campo) {
  campo.input.closest('.form__field').classList.remove('form__field--invalid');
  campo.erro.textContent = '';
}

function validarFormulario() {
  let valido = true;

  if (campos.nome.input.value.trim() === '') {
    marcarErro(campos.nome, 'Por favor, preencha seu nome.');
    valido = false;
  } else {
    limparErro(campos.nome);
  }

  const emailValor = campos.email.input.value.trim();
  if (emailValor === '') {
    marcarErro(campos.email, 'Por favor, preencha seu e-mail.');
    valido = false;
  } else if (!emailRegex.test(emailValor)) {
    marcarErro(campos.email, 'Digite um e-mail válido (ex: voce@exemplo.com).');
    valido = false;
  } else {
    limparErro(campos.email);
  }

  if (campos.mensagem.input.value.trim() === '') {
    marcarErro(campos.mensagem, 'Escreva uma mensagem antes de enviar.');
    valido = false;
  } else {
    limparErro(campos.mensagem);
  }

  return valido;
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!validarFormulario()) return;

  // Simulação de envio: como não há back-end, apenas limpamos o formulário
  // e exibimos a mensagem de confirmação em uma caixa modal.
  form.reset();
  modal.hidden = false;
});

closeModal.addEventListener('click', () => {
  modal.hidden = true;
});

// Fecha o modal também ao clicar fora da caixa
modal.addEventListener('click', (evento) => {
  if (evento.target === modal) modal.hidden = true;
});
