import {
  addTaskPage,
  addTaskData,
  setTaskIndex,
} from '/scripts/modules/dataController.js';

export const createTitle = () => {
  const h3 = document.createElement('h3');

  h3.textContent = 'Это твой список дел, ';

  return h3;
};

const createButtonsGroup = params => {
  const btns = params.map(({
    className,
    type,
    text,
  }) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });

  return {
    btns,
  };
};

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'flex-wrap', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
      <label class="form-group w-100 mb-3 flex-fill">
        <input class="form-control" type="text" name="task"
        placeholder="Запиши новую задачу здесь">
      </label>
      <select class="form-group form-select-sm me-auto" name="priority">
        <option value="" disabled selected>Приоритет задачи</option>
        <option value="default">Обычная</option>
        <option value="important">Важная</option>
        <option value="urgent">Срочная</option>
      </select>
  `);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary btn-save me-2',
      type: 'submit',
      text: 'Сохранить',
      name: 'btnSave',
    },
    {
      className: 'btn btn-warning btn-clear',
      type: 'reset',
      text: 'Очистить',
      name: 'btnClear',
    },
  ]);

  form.append(...buttonGroup.btns);

  form.elements[2].disabled = true;

  return form;
};

export const createWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('table-wrapper');
  return wrapper;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

export const createRow = ({
  index,
  task,
  status,
  priority,
  id,
}) => {
  const tr = document.createElement('tr');
  tr.classList.add('todolist-item');
  switch (priority) {
    case 'important':
      tr.classList.add('table-warning');
      break;

    case 'urgent':
      tr.classList.add('table-danger');
      break;

    default:
      tr.classList.add('table-light');
      break;
  }
  tr.dataset.id = id;
  tr.dataset.priority = priority;

  const tdIndex = document.createElement('td');
  tdIndex.classList.add('task-index');
  tdIndex.textContent = index;

  const tdTask = document.createElement('td');
  tdTask.textContent = task;
  tdTask.classList.add('task');
  tdTask.setAttribute('contenteditable', 'false');

  const tdStatus = document.createElement('td');
  tdStatus.textContent = status;
  if (status === 'Выполнено') {
    tr.classList.add('table-success');
    tr.classList.remove('table-warning', 'table-danger', 'table-light');
    tdTask.classList.add('text-decoration-line-through');
  }

  const tdActions = document.createElement('td');

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-2',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-warning btn-edit me-2',
      type: 'button',
      text: 'Редактировать',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
  ]);
  tdActions.append(...buttonGroup.btns);

  if (status === 'Выполнено') {
    buttonGroup.btns[1].disabled = true;
    buttonGroup.btns[2].disabled = true;
  }

  tr.append(tdIndex, tdTask, tdStatus, tdActions);

  return tr;
};

const createTaskId = () => {
  const taskId = Math.random().toString().substring(2, 7);
  return taskId;
};

export const createGreeting = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay', 'is-visible');

  const greetingForm = document.createElement('form');
  greetingForm.classList.add('greeting-form');
  greetingForm.insertAdjacentHTML('beforeend', `
  <h4 class="form-title" > Добро пожаловать!</h4>
    <label class="form-label" for="username">
      Пожалуйста, представься, чтобы я мог загрузить твой список дел
      или создать новый:
      <input class="form-input" name="username" 
      placeholder="Запиши свое имя здесь" required>
    </label>
    <p class="error-message" name="errorMessage">
    * Поле с именем не может быть пустым
    </p>
`);

  const setUsername = createButtonsGroup([
    {
      className: 'btn btn-primary greeting-form-btn',
      type: 'submit',
      text: 'Сохранить',
    },
  ]);

  greetingForm.append(...setUsername.btns);
  overlay.append(greetingForm);

  return {
    overlay,
    greetingForm,
  };
};

export const createTask = (form, list, username) => {
  let currentIndex = list.children.length + 1;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('index', currentIndex);
    formData.append('status', 'В процессе');
    formData.append('id', createTaskId());
    const newTask = Object.fromEntries(formData);

    addTaskPage(newTask, list);
    addTaskData(newTask, username);

    form.reset();
    form.elements[2].disabled = true;
    setTaskIndex();
  });
};
