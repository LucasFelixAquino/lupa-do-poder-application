const str = {
  toTitleCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  toBRL(value) {
    return 'R$ ' + value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}).replace('R$', '').replace(' ', '');
  }
};

export default str;
