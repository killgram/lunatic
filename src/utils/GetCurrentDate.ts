const getCurrentDate = () => {
  const date = new Date().toLocaleDateString("ru");
  const time = new Date().toLocaleTimeString("ru");
  return `${time} ${date}`;
};

export { getCurrentDate };
