
import { createRow } from '/scripts/modules/createController.js';

import {
  getStorage,
  setStorage,
  removeStorage,
  updateStorage,
} from '/scripts/modules/storageController.js';

export const getTaskIndex = (data) => {
  data.reduce((acc, item, index) => {
    item.index = index + 1;
  }, 1);
};

export const setTaskIndex = () => {
  let taskIndeces = document.getElementsByClassName('task-index');
  let itemIndex = 1;
  for (let index of taskIndeces) {
    index.textContent = itemIndex;
    itemIndex++;
  }
};

export const addTaskData = (todoItem, username) => {
  const data = getStorage(username);
  data.push(todoItem);
  setStorage(data, username);
};

export const addTaskPage = (contact, list) => {
  list.append(createRow(contact));
};

export const deleteControl = (list, username) => {
  list.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.btn-danger')) {
      const deleteConfirm = confirm('Действительно хочешь удалить эту задачу?');
      if (deleteConfirm) {
        removeStorage(target.closest('.todolist-item').dataset.id,
          username);
        target.closest('.todolist-item').remove();
        setTaskIndex();
      }
    }
  });
};

export const completeControl = (list, username) => {
  list.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.btn-success')) {
      const data = getStorage(username);
      if (target.closest('.todolist-item')
        .classList.contains('table-success')) {
        return;
      }

      target.closest('.todolist-item').classList.remove('table-warning');
      target.closest('.todolist-item').classList.remove('table-danger');
      target.closest('.todolist-item').classList.remove('table-light');
      target.closest('.todolist-item').classList.add('table-success');
      target.closest('.todolist-item').children[1]
        .classList.add('text-decoration-line-through');

      const completeTaskId = target.closest('.todolist-item').dataset.id;
      const task = data.find(item => item.id === completeTaskId);
      if (task) {
        task.status = 'Выполнено';
        setStorage(data, username);
      }
      target.closest('.todolist-item').children[2].textContent = 'Выполнено';
      delete target.closest('.todolist-item').dataset.priority;
    }
  });
};

export const formControl = (form) => {
  form.addEventListener('change', event => {
    if (form.task.value !== null && form.task.value.trim() !== '') {
      form.elements[2].disabled = false;
      form.priority.required = true;
    }
  });

  form.addEventListener('click', event => {
    if (event.target === form.elements[3]) {
      form.elements[2].disabled = true;
    }
  });
};

export const editControl = (list, username) => {
  list.addEventListener('click', event => {
    const target = event.target;
    const listItem = target.closest('.todolist-item');
    const editButton = target.closest('.btn-warning');
    const task = listItem.children[1];
    if (editButton) {
      if (task.classList.contains('text-decoration-line-through')) {
        return;
      }

      if (task.contentEditable === 'true') {
        task.contentEditable = 'false';
        editButton.textContent = 'Редактировать';
        task.classList.remove('editing');

        const editedTodo = {
          task: task.textContent.trim(),
          priority: listItem.dataset.priority,
          index: listItem.children[0].textContent,
          status: listItem.children[2].textContent,
          id: listItem.dataset.id,
        };
        updateStorage(listItem.dataset.id, editedTodo, username);
      } else {
        task.contentEditable = 'true';
        editButton.textContent = 'Применить';
        task.classList.add('editing');
      }
    }
  });
};
