const TimestampConverter = (timestamp: string, format: string, writeTodayYesterday: boolean = false) => {
  const datetime = new Date(timestamp);

  if(writeTodayYesterday) {
    const tsToday = new Date();
    const tsYesterday = new Date();
    tsYesterday.setDate(tsToday.getDate() - 1);
  
    const isToday = datetime.toDateString() === tsToday.toDateString();
    const isYesterday = datetime.toDateString() === tsYesterday.toDateString();


    if(isToday) {
      return 'Heute, ' + datetime.toLocaleTimeString(format, {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    if(isYesterday) {
      return 'Gestern, ' + datetime.toLocaleTimeString(format, {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  return datetime.toLocaleString(format, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default TimestampConverter;