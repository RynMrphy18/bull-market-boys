module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at
            ${new Date(date).getUTCHours()}:${new Date(date).getUTCMinutes()}:${new Date(date).getUTCSeconds()}`;
  },
};
