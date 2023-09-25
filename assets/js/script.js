class Formulario {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fieldsValids = this.fieldsAreValid();
    const passwordsValids = this.passwordsAreValids();

    if (fieldsValids && passwordsValids) {
      alert(`Formúlario enviado!`);
      this.form.submit();
    }
  }

  fieldsAreValid() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let field of this.form.querySelectorAll('.validate')) {
      if (!field.value) {
        this.createError(field, `*Campo '${field.name}' está em branco.`);
        valid = false;
      }

      if (field.classList.contains('input-CPF')) {
        if (!this.validateCPF(field)) valid = false;
      }

      if (field.classList.contains('input-user')) {
        if (!this.validateUser(field)) valid = false;
      }
    }
    return valid;
  }

  passwordsAreValids() {
    let valid = true;
    const password = this.form.querySelector('.input-password');
    const confirmPassword = this.form.querySelector('.input-confirm-password');

    if (password.length < 6 || password.length > 12) {
      valid = false;
      this.createError(password, `*Senha precisa ter entre 6 e 12 caracteres`);
    }
    if (password.value !== confirmPassword.value) {
      valid = false;
      this.createError(
        confirmPassword,
        `*Senha e confirmar senha precisam ser iguais`
      );
      this.createError(
        password,
        `*Senha e confirmar senha precisam ser iguais`
      );
    }
    return valid;
  }

  validateUser(field) {
    const user = field.value;
    let valid = true;
    if (user.length < 3 || user.length > 12) {
      this.createError(field, `*Usuário precisa ter entre 3 e 12 caracteres `);
      valid = false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(
        field,
        `*Usuário precisa conter somente letras e/ou números`
      );
      valid = false;
    }

    return valid;
  }

  validateCPF(field) {
    const cpf = new ValidaCPF(field.value);
    if (!cpf.valida()) {
      this.createError(field, `*CPF inválido`);
      return false;
    }
    return true;
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const validation = new Formulario();
