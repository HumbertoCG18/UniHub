// unihub-novo/src/utils/dateUtils.js

export const formatDataInicio = (data) => {
  const dateObj = new Date(data);
  const hoje = new Date();
  const utcDateObj = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
  const utcHoje = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));

  const diffTime = Math.abs(utcHoje - utcDateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Hoje";
  if (diffDays < 30) return `Há ${diffDays} dia(s)`;
  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `Há ${diffMonths} mes(es)`;
  }
  const diffYears = Math.floor(diffDays / 365);
  const diffMonths = Math.floor((diffDays % 365) / 30);
  let result = `Há ${diffYears} ano(s)`;
  if (diffMonths > 0) {
    result += ` e ${diffMonths} mes(es)`;
  }
  return result;
};

export const getDayNames = (locale = 'pt-BR', format = 'short') => {
  const dayNames = [];
  const date = new Date();
  date.setDate(date.getDate() - date.getDay()); // Vai para o último domingo
  for (let i = 0; i < 7; i++) {
    dayNames.push(date.toLocaleDateString(locale, { weekday: format }));
    date.setDate(date.getDate() + 1);
  }
  return dayNames;
};

export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();