import {
  renderTodo,
  renderTodoList,
} from '/scripts/modules/renderController.js';
import { getUserName } from '/scripts/modules/overlayController.js';
import { getStorage } from '/scripts/modules/storageController.js';
import {
  getTaskIndex,
  completeControl,
  deleteControl,
  formControl,
  editControl,
} from '/scripts/modules/dataController.js';
import { createTask } from '/scripts/modules/createController.js';

const init = async () => {
  const todoList = renderTodoList();
  const {
    list,
    form,
    overlay,
    greetingForm,
  } = todoList;
  const userData = await getUserName(overlay, greetingForm);
  const {
    username,
  } = userData;
  const taskList = getStorage(username);


  getTaskIndex(taskList);
  renderTodo(list, taskList);
  completeControl(list, username);
  deleteControl(list, username);
  createTask(form, list, username);
  formControl(form);
  editControl(list, username);
};

init();
