export default class TaskManager {
  constructor(element) {
    this.element = element;

    this.onOpenNote = this.onOpenNote.bind(this);
    this.element.addEventListener('click', this.onOpenNote);

    this.onCloseNote = this.onCloseNote.bind(this);
    this.element.addEventListener('click', this.onCloseNote);

    this.noteOnMouseDown = this.noteOnMouseDown.bind(this);

    this.noteOnMouseOver = this.noteOnMouseOver.bind(this);
    this.element.addEventListener('mouseover', this.noteOnMouseOver);

    this.noteOnMouseUp = this.noteOnMouseUp.bind(this);
    this.element.addEventListener('mouseup', this.noteOnMouseUp);

    this.OnAddTask = this.OnAddTask.bind(this);
    this.element.addEventListener('click', this.OnAddTask);

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
            <div class="note">Выучиться на веб-разработчика 2.0 /n 76475r67365 \n jhrkehvkhvk</div>
          </div>
          <div class="note-wrapper">
            <div class="note">Выучиться на веб-разработчика\njhrkehvkhvk</div>
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
    closingElement.textContent = `x`;
    return closingElement;
  }

  bindToDom() {
    this.element.innerHTML = TaskManager.markup;

    // this.element.insertAdjacentHTML('afterend', TaskManager.closingElement);

    this.noteClosingElement = TaskManager.closingElement;

    this.contents = this.element.querySelectorAll('.content');

    this.contents.forEach((content) => {
      content.addEventListener('mousedown', this.noteOnMouseDown);
    });
  }

  onOpenNote(e) {
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

  OnAddTask(e) {
    e.preventDefault();
    // console.log(this.element);

    if (e.target.classList.contains('add-button')) {
      console.log('click');
      const textarea = e.target.parentElement.querySelector('textarea');
      const { value } = textarea; // без переносов строки
      console.log(e.target.closest('.column'));
      if (value) {
        e.target
          .closest('.column')
          .querySelector('.content')
          .appendChild(TaskManager.newNote(value));
        console.log(textarea);
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
    // e.preventDefault();
    if (e.target.classList.contains('note')) {
      e.target.dataset.closing = 'possible';
      this.showCLosingElement(e.target);
    }

    /* if (e.target.classList.contains('note') || e.target.classList.contains('close')) {
      this.showCLosingElement(e.target);
    } */
  }

  onMouseOut(e) {
    // e.preventDefault();
    if (e.target.classList.contains('note')) {
      if (e.relatedTarget.classList.contains('close')) {
        // если перешёл на закрывающий элемент, продолжить его отображение
        this.showCLosingElement(e.target);
      } else {
        // this.hideCLosingElement(e.target);
        this.hideCLosingElement();
        delete e.target.dataset.closing;
      }
      // this.hideCLosingElement(e.target);
    }
  }

  onCloseNote(e) {
    if (e.target.classList.contains('close')) {
      // e.preventDefault();
      console.log(this.element);
      console.log('delete note');
      e.target.parentElement.remove();
      // e.target.closest('note-wrapper').remove();
    }
  }

  showCLosingElement(element) {
    /* element
      .closest('.note-wrapper')
      .insertAdjacentHTML('afterend', TaskManager.closingElement); */
    element.closest('.note-wrapper').appendChild(this.noteClosingElement);

    const closingElement = document.querySelector('.close');
    closingElement.classList.remove('hidden');

    element.parentElement.appendChild(closingElement);

    console.log(element.getBoundingClientRect());
    const { right, top } = element.getBoundingClientRect();

    closingElement.style.top = `${top + 5}px`;
    closingElement.style.left = `${right - 20}px`;
  }

  hideCLosingElement(element) {
    const closingElement = document.querySelector('.close');
    closingElement.remove();
    // closingElement.classList.add('hidden');
    this.noteClosingElement.classList.add('hidden');
  }

  noteOnMouseDown(e) {
    // e.preventDefault();

    if (e.target.classList.contains('note')) {
      console.log('mousedown');
      console.log(e.target);

      this.draggedElement = e.target.closest('.note-wrapper');
      this.draggedElement.classList.add('dragged');

      document.documentElement.addEventListener('mouseup', this.noteOnMouseUp); // documentElement - корневой элемент
      document.documentElement.addEventListener(
        'mouseover',
        this.noteOnMouseOver
      );
    }
  }

  noteOnMouseOver(e) {
    // e.preventDefault();

    if (this.draggedElement) {
      console.log(e);

      this.draggedElement.style.cursor = 'grabbing';

      this.draggedElement.style.top = `${e.clientY}px`;
      this.draggedElement.style.left = `${e.clientX}px`;
    }
  }

  noteOnMouseUp(e) {
    e.preventDefault();
    if (this.draggedElement) {
      const mouseUpItem = e.target;
      console.dir(mouseUpItem);
      if (mouseUpItem.classList.contains('note')) {
        // Определяю порядок вставки элемента: до или после.
        if (e.clientY > mouseUpItem.offsetTop + mouseUpItem.offsetHeight / 2) {
          mouseUpItem
            .closest('.content')
            .insertBefore(
              this.draggedElement,
              mouseUpItem.parentElement.nextSibling
            );
        } else {
          mouseUpItem
            .closest('.content')
            .insertBefore(this.draggedElement, mouseUpItem.parentElement);
        }
      }

      if (mouseUpItem.classList.contains('column')) {
        mouseUpItem.querySelector('.content').appendChild(this.draggedElement);
      }

      this.draggedElement.classList.remove('dragged');
      this.draggedElement = undefined;
      console.log('mouseup');

      document.documentElement.removeEventListener(
        'mouseup',
        this.noteOnMouseUp
      ); // documentElement - корневой элемент
      document.documentElement.removeEventListener(
        'mouseover',
        this.noteOnMouseOver
      );
    }
  }
}
