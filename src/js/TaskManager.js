export default class TaskManager {
  constructor(element) {
    this.element = element;

    this.draggedElement = null;
    this.noteClosingElement = null;

    this.element.addEventListener('click', TaskManager.onOpenNote);

    this.element.addEventListener('click', TaskManager.OnAddTask);

    // this.onCloseNote = this.onCloseNote.bind(this);
    this.element.addEventListener('click', TaskManager.onCloseNote);

    this.noteOnMouseDown = this.noteOnMouseDown.bind(this);

    this.noteOnMouseMove = this.noteOnMouseMove.bind(this);
    this.element.addEventListener('mousemove', this.noteOnMouseMove);

    this.noteOnMouseUp = this.noteOnMouseUp.bind(this);
    this.element.addEventListener('mouseup', this.noteOnMouseUp);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.element.addEventListener('mouseover', this.onMouseOver);

    this.onMouseOut = this.onMouseOut.bind(this);
    this.element.addEventListener('mouseout', this.onMouseOut);
  }

  static get markup() {
    return `
    <div class="column">
      <div class="column-data">
        <div class="title" name="todo">todo</div>
        <div class="content">
          <div class="note-wrapper">
            <div class="note">Научиться тайм-менеджменту</div>
          </div>
        </div>
      </div>
      <div class="add-note">
        <button name="open-note-content" class="open-note-content" type="button">Add another card</button>
        <div class="new-note-content hidden">
          <textarea name="new-note" class="textarea-new" rows="5" placeholder="Введите текст новой заметки"
            required></textarea>
          <button name="add-button" class="add-button" type="button">Add card</button>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="column-data">
        <div class="title" name="in progress">in progress</div>
        <div class="content">
          <div class="note-wrapper">
            <div class="note">Выучиться на веб-разработчика</div>
          </div>
        </div>
      </div>
      <div class="add-note">
        <button name="open-note-content" class="open-note-content" type="button">Add another card</button>
        <div class="new-note-content hidden">
          <textarea name="new-note" class="textarea-new" rows="5" placeholder="Введите текст новой заметки"
            required></textarea>
          <button name="add-button" class="add-button" type="button">Add card</button>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="column-data">
        <div class="title" name="done">done</div>
        <div class="content">
          <div class="note-wrapper">
            <div class="note">Помыть посуду</div>
          </div>
          <div class="note-wrapper">
            <div class="note">Погулять</div>
          </div>
          <div class="note-wrapper">
            <div class="note">Сходить в магазин</div>
          </div>
        </div>
      </div>
      <div class="add-note">
        <button name="open-note-content" class="open-note-content" type="button">Add another card</button>
        <div class="new-note-content hidden">
          <textarea name="new-note" class="textarea-new" rows="5" placeholder="Введите текст новой заметки"
            required></textarea>
          <button name="add-button" class="add-button" type="button">Add card</button>
        </div>
      </div>        
    </div>
    `;
  }

  static get closingElement() {
    const closingElement = document.createElement('div');
    closingElement.classList.add('close', 'hidden');
    return closingElement;
  }

  bindToDom() {
    this.element.innerHTML = TaskManager.markup;

    this.noteClosingElement = TaskManager.closingElement;

    this.contents = this.element.querySelectorAll('.content');

    this.contents.forEach((content) => {
      content.addEventListener('mousedown', this.noteOnMouseDown);
    });
  }

  static onOpenNote(e) {
    e.preventDefault();
    if (e.target.classList.contains('open-note-content')) {
      e.target
        .closest('.add-note')
        .querySelector('.new-note-content')
        .classList.toggle('hidden');

      e.target.closest('.add-note').querySelector('textarea').focus();

      e.target.classList.toggle('hidden');
    }
  }

  static OnAddTask(e) {
    e.preventDefault();

    if (e.target.classList.contains('add-button')) {
      const textarea = e.target.parentElement.querySelector('textarea');
      const { value } = textarea; // без переносов строки
      if (value) {
        e.target
          .closest('.column')
          .querySelector('.content')
          .appendChild(TaskManager.newNote(value));
        textarea.value = '';

        e.target
          .closest('.add-note')
          .querySelector('.open-note-content')
          .classList.toggle('hidden');
        e.target.parentElement.classList.toggle('hidden');
      }
    }
  }

  static newNote(value) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('note-wrapper');

    const note = document.createElement('div');
    note.classList.add('note');
    note.textContent = value;

    wrapper.appendChild(note);
    return wrapper;
  }

  onMouseOver(e) {
    if (e.target.classList.contains('note')) {
      e.target.dataset.closing = 'possible';
      this.showCLosingElement(e.target);

      const { width, height } = e.target.getBoundingClientRect();
      this.width = width;
      this.height = height;
    }
  }

  onMouseOut(e) {
    if (e.target.classList.contains('note')) {
      if (e.relatedTarget.classList.contains('close')) {
        // если перешёл на закрывающий элемент, продолжить его отображение
        this.showCLosingElement(e.target);
      } else {
        this.hideCLosingElement();
        delete e.target.dataset.closing;
      }
    }
  }

  static onCloseNote(e) {
    if (e.target.classList.contains('close')) {
      e.target.parentElement.remove();
    }
  }

  showCLosingElement(element) {
    element.closest('.note-wrapper').appendChild(this.noteClosingElement);

    const closingElement = document.querySelector('.close');
    closingElement.classList.remove('hidden');

    element.parentElement.appendChild(closingElement);

    const { right, top } = element.getBoundingClientRect();

    closingElement.style.top = `${top + 5}px`;
    closingElement.style.left = `${right - 20}px`;
  }

  hideCLosingElement() {
    const closingElement = document.querySelector('.close');
    closingElement.remove();
    this.noteClosingElement.classList.add('hidden');
  }

  noteOnMouseDown(e) {
    e.preventDefault();

    if (e.target.classList.contains('note')) {
      this.draggedElement = e.target.closest('.note-wrapper');
      this.draggedElement.classList.add('dragged');

      // this.draggedElement.style.cursor = 'grabbing';

      // shifts
      this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
      this.shiftY = e.clientY - e.target.getBoundingClientRect().top;

      // сохранение первоначальных размеров
      this.draggedElement.style.width = `${this.width}px`;
      this.draggedElement.style.height = `${this.height}px`;

      this.proection = TaskManager.creatProection(this.draggedElement); // добавление проекции перетягиваемого элемента

      document.documentElement.addEventListener('mouseup', this.noteOnMouseUp); // documentElement - корневой элемент
      document.documentElement.addEventListener(
        'mousemove',
        this.noteOnMouseMove
      );
    }
  }

  noteOnMouseMove(e) {
    e.preventDefault();

    if (this.draggedElement) {
      // this.draggedElement.style.cursor = 'grabbing';

      this.draggedElement.style.width = `${this.width}px`;
      this.draggedElement.style.height = `${this.height}px`;

      this.draggedElement.style.top = `${e.clientY - this.shiftY}px`;
      this.draggedElement.style.left = `${e.clientX - this.shiftX}px`;

      TaskManager.definePlace(e, this.proection, e.target);
    }
  }

  noteOnMouseUp(e) {
    e.preventDefault();

    if (this.draggedElement) {
      // Определяю порядок вставки элемента: до или после.
      const { y, height } = e.target.getBoundingClientRect();

      const appendPosition =
        y + height / 2 > e.clientY ? 'beforebegin' : 'afterend';

      if (e.target.classList.contains('note')) {
        e.target.parentElement.insertAdjacentElement(
          appendPosition,
          this.draggedElement
        );
      }
      if (e.target.classList.contains('proection')) {
        e.target.insertAdjacentElement(appendPosition, this.draggedElement);
      }
      if (e.target.classList.contains('column')) {
        e.target.querySelector('.content').appendChild(this.draggedElement);
      }

      this.proection.remove();
      this.proection = null;

      // Убираем стили, которые навесили при перетаскивании элемента
      this.draggedElement.style.cssText = `
        cursor = "";
        width = "";
        height = "";
        top = "";
        left = "";
      `;

      this.draggedElement.classList.remove('dragged');
      this.draggedElement = undefined;

      document.documentElement.removeEventListener(
        'mouseup',
        this.noteOnMouseUp
      ); // documentElement - корневой элемент
      document.documentElement.removeEventListener(
        'mouseover',
        this.noteOnMouseMove
      );
    }
  }

  static definePlace(e, element, mouseUpElement) {
    if (mouseUpElement.classList.contains('note')) {
      // Определяю порядок вставки элемента: до или после.
      const { y, height } = e.target.getBoundingClientRect();

      const appendPosition =
        y + height / 2 > e.clientY ? 'beforebegin' : 'afterend';

      mouseUpElement.parentElement.insertAdjacentElement(
        appendPosition,
        element
      );
    }
  }

  static creatProection(draggedElement) {
    return (() => {
      const d = document.createElement('div');
      d.classList.add('proection');
      const { width, height } = window.getComputedStyle(draggedElement);
      d.style.cssText = `
	 			width: ${width};
		 		height: ${height};
			`;
      return d;
    })();
  }
}
