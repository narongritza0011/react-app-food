const dateTimeTH = (datetime) => {
  //เเปลงเป็นวันเเบบ TH
  const dateTimeString = datetime;
  const dateTime = new Date(dateTimeString);
  const optionsDate = { day: "numeric", month: "long", year: "numeric" };
  const formattedDateTimeTH = dateTime.toLocaleDateString("th-TH", optionsDate);
  //เเปลงเวลา TH
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formattedTimeTH = dateTime.toLocaleTimeString("th-TH", optionsTime);

  //fulldatetimeth
  return formattedDateTimeTH + " / " + formattedTimeTH;
};

export default dateTimeTH;
