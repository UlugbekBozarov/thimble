const getItemLocalStorage = (name: string) => {
  try {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else return undefined;
  } catch (error) {
    return undefined;
  }
};

export default getItemLocalStorage;
