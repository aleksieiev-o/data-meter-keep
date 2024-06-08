export const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  const [month, day, year] = formattedDate.split('/');
  return `${day}.${month}.${year}`;
};
