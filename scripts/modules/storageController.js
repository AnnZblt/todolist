export const getStorage = (username) => {
  const storageData = localStorage.getItem(username);
  return storageData ? JSON.parse(storageData) : [];
};

export const setStorage = (data, username) => {
  localStorage.setItem(username, JSON.stringify(data));
};

export const removeStorage = (todoId, username) => {
  const data = getStorage(username);
  const newData = data.filter(item => item.id !== todoId);
  setStorage(newData, username);
};

export const updateStorage = (todoId, newTodo, username) => {
  const data = getStorage(username);
  const updatedData = data.map(item => {
    if (item.id === todoId) {
      return newTodo;
    }
    return item;
  });
  setStorage(updatedData, username);
};

