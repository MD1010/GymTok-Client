export const loadState = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return "";
    }
    return serializedState;
    //   return JSON.parse(serializedState)
  } catch (err) {
    return "";
  }
};

export const saveState = (state: any, name: string) => {
  try {
    //const serializedState = JSON.stringify(state)
    localStorage.setItem(name, state);
  } catch (err) {
    // to define
  }
};
