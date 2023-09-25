class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      value: cpfEnviado.replace(/\D+/g, ''),
      writable: false,
      enumerable: true,
      configurable: false,
    });
  }

  geraNovoCPF() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  //static pois não usa o this
  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumero of cpfSemDigitos) {
      total += reverso * Number(stringNumero);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== 'string') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    this.geraNovoCPF();
    return this.novoCPF === this.cpfLimpo;
  }

  isSequencia() {
    return (
      this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    );
  }
}

// const cpf = new ValidaCPF('485.425.918-36');

// if (cpf.valida()) console.log(`${cpf.cpfLimpo} é válido!`);
// else console.log(`${cpf.cpfEnviado} é inválido!`);
