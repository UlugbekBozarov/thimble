const getItemLocalStorage = (name: string) => {
  try {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else return null;
  } catch (error) {
    return null;
  }
};

export default getItemLocalStorage;
