const datetime = {
  toBrazilFormat(dateStr) {
    const [year, month, day] = dateStr.split('T')[0].split('-')

    return `${day}/${month}/${year}`;
  },

  getYear(dateStr) {
    const [year, month, day] = dateStr.split('T')[0].split('-')
    return year;
  }
};

export default datetime;
