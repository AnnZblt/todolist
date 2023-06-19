import {
  createTitle,
  createForm,
  createWrapper,
  createTable,
  createRow,
  createGreeting,
} from '/scripts/modules/createController.js';

export const renderTodo = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
};

export const renderTodoList = () => {
  const app = document.querySelector('.app-container');
  const greeting = createGreeting();
  const {
    overlay,
    greetingForm,
  } = greeting;

  const title = createTitle();
  const wrapper = createWrapper();
  const form = createForm();
  const table = createTable();

  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
    'justify-content-center', 'flex-column');
  wrapper.append(table);
  app.append(overlay, title, form, wrapper);

  return {
    list: table.tbody,
    form,
    overlay,
    greetingForm,
    title,
  };
};
