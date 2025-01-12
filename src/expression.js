export class Expression {
    constructor(expression) {
      this.expression = expression;
    }
  
    // Метод для дифференцирования одного терма
    differentiateTerm(term, variable) {
  // Обрабатываем отрицательный знак
  const isNegative = term.startsWith('-');
  const cleanTerm = isNegative ? term.substring(1) : term;

  if (cleanTerm.includes('^')) {
    const [base, exponent] = cleanTerm.split('^');
    if (base.trim() === variable) {
      const newExponent = Number(exponent.trim()) - 1;
      const coefficient = Number(exponent.trim());
      const result = `${coefficient}*${variable}${newExponent === 1 ? '' : `^${newExponent}`}`;
      return isNegative ? `-${result}` : result;
    }
  }

  if (cleanTerm === variable) {
    return isNegative ? '-1' : '1';
  }

  if (!isNaN(cleanTerm)) {
    return '0';
  }

  if (cleanTerm.includes(variable)) {
    const coefficient = cleanTerm.split('*')[0];
    const result = coefficient ? coefficient : '1';
    return isNegative ? `-${result}` : result;
  }
}

    
    // Основной метод дифференцирования
    diff(variable) {
      if (!this.expression.includes(variable)) {
        return new Expression('0');
      }
  
      const terms = this.expression.match(/[+-]?[^+-]+/g).map(term => term.trim());
  
      const differentiatedTerms = terms.map(term => this.differentiateTerm(term, variable));
  
      const filteredTerms = differentiatedTerms.filter(term => term !== '0' && term !== '');
  
      const result = filteredTerms.join(' + ').replace(/\+ \-/g, '- ');
  
      return new Expression(result || '0');
    }
  
    // Метод для строкового представления
    toString() {
      return this.expression;
    }
  }
  