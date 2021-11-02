module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at
            ${new Date(date).getUTCHours()}:${new Date(date).getUTCMinutes()}:${new Date(date).getUTCSeconds()}`;
  },
  format_price: (price) => {
    return '$' + (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  },
  if_buy: (type) => {
    if(type == 'buy'){
      return 'table-success';
    }
    return 'table-danger';
  }
};
