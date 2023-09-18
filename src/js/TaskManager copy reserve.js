export default class TaskManager {
  constructor(element) {
    this.element = element;

    this.draggedElement = null;
    this.noteClosingElement = null;

    // this.onOpenNote = this.onOpenNote.bind(this);
    this.element.addEventListener('click', TaskManager.onOpenNote);

    /* this.onOpenNote = this.onOpenNote.bind(this);
    this.element.addEventListener('click', this.onOpenNote); */

    // this.OnAddTask = this.OnAddTask.bind(this);
    this.element.addEventListener('click', TaskManager.OnAddTask);

    /* this.OnAddTask = this.OnAddTask.bind(this);
    this.element.addEventListener('click', this.OnAddTask); */

    this.onCloseNote = this.onCloseNote.bind(this);
    this.element.addEventListener('click', this.onCloseNote);

    this.noteOnMouseDown = this.noteOnMouseDown.bind(this);

    this.noteOnMouseMove = this.noteOnMouseMove.bind(this);
    // this.element.addEventListener('mouseover', this.noteOnMouseOver);
    this.element.addEventListener('mousemove', this.noteOnMouseMove);

    this.noteOnMouseUp = this.noteOnMouseUp.bind(this);
    this.element.addEventListener('mouseup', this.noteOnMouseUp);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.element.addEventListener('mouseover', this.onMouseOver);

    this.onMouseOut = this.onMouseOut.bind(this);
    this.element.addEventListener('mouseout', this.onMouseOut);

    /* this.onMouseOver2 = this.onMouseOver2.bind(this);
    this.element.addEventListener('mouseover', this.onMouseOver2); */
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

  // Работающий оригинал
  /* onMouseOver(e) {
    // e.preventDefault();
    if (e.target.classList.contains('note')) {
      e.target.dataset.closing = 'possible';
      this.showCLosingElement(e.target);

      this.proection = TaskManager.creatProection(this.draggedElement); // добавление проекции перетягиваемого элемента      
      // e.target.closest('.note-wrapper').insertAdjacentElement('afterend', this.proection);
      
      console.log(e);
      // const mouseUpElement = e.target;
      // TaskManager.definePlace(e, this.proection, mouseUpElement);
    }
  } */

  onMouseOver(e) {
    // e.preventDefault();
    if (e.target.classList.contains('note')) {
      e.target.dataset.closing = 'possible';
      this.showCLosingElement(e.target);

      const { width, height } = e.target.getBoundingClientRect();
      this.width = width;
      this.height = height;
      // console.log(this.width + ' на ' + this.height);
      // this.proection = TaskManager.creatProection(this.draggedElement); // добавление проекции перетягиваемого элемента      
      // e.target.closest('.note-wrapper').insertAdjacentElement('afterend', this.proection);

      // console.log(e);
      // const mouseUpElement = e.target;
      // TaskManager.definePlace(e, this.proection, mouseUpElement);
    }
  }

  // Работающий оригинал
  /* onMouseOut(e) {
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

    if (e.target.classList.contains('note') && this.draggedElement && this.proection) {
      // e.target.remove();
      this.proection.remove();
      this.proection = null;
    }
  } */

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

    /* if (e.target.classList.contains('note') && this.draggedElement && this.proection) {
      // e.target.remove();
      this.proection.remove();
      this.proection = null;
    } */
  }

  onCloseNote(e) {
    if (e.target.classList.contains('close')) {
      // e.preventDefault();
      // console.log(this.element);
      // console.log('delete note');
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

    // console.log(element.getBoundingClientRect());
    const { right, top } = element.getBoundingClientRect();

    closingElement.style.top = `${top + 5}px`;
    closingElement.style.left = `${right - 20}px`;
  }

  hideCLosingElement() {
    const closingElement = document.querySelector('.close');
    closingElement.remove();
    // closingElement.classList.add('hidden');
    this.noteClosingElement.classList.add('hidden');
  }

  noteOnMouseDown(e) {
    e.preventDefault();

    if (e.target.classList.contains('note')) {
      // console.log('mousedown');
      // console.log(e.target);

      this.draggedElement = e.target.closest('.note-wrapper');
      this.draggedElement.classList.add('dragged');

      // this.draggedElement.style.cursor = 'grabbing';


      // const {width, height} = window.getComputedStyle(e.target.closest('.note-wrapper'));
      /* const {width, height} = e.target.closest('.note-wrapper').getBoundingClientRect();
      this.width = width;
      this.height = height;
      console.log(this.width + ' на ' + this.height); */


      // shifts
      this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
      this.shiftY = e.clientY - e.target.getBoundingClientRect().top;

      // сохранение первоначальных размеров
      this.draggedElement.style.width = this.width + 'px';
      this.draggedElement.style.height = this.height + 'px';

      // !!!!
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
      // console.log(e);
      // console.log(e.target);
      // console.log(this.draggedElement);


      /*       this.draggedElement.style.top = `${e.clientY + e.target.offsetTop}px`;
      this.draggedElement.style.left = `${e.clientX - e.target.offsetWidth}px`; */

      // this.draggedElement.style.cursor = 'grabbing';


      this.draggedElement.style.width = `${this.width}px`;
      this.draggedElement.style.height = `${this.height}px`;

      this.draggedElement.style.top = `${e.clientY - this.shiftY}px`;
      this.draggedElement.style.left = `${e.clientX - this.shiftX}px`;

      TaskManager.definePlace(e, this.proection, e.target);
      // const mouseUpElement = e.target;
      // TaskManager.definePlace(e, this.proection, mouseUpElement);

      /* if (e.target.classList.contains('note')) {
        const proection = TaskManager.creatProection(this.draggedElement);
        e.target.closest('.note-wrapper').appendChild(proection);
      } */
    }
  }

  noteOnMouseUp(e) {
    e.preventDefault();

    if (this.draggedElement) {
      console.log(e.target);
      /* const mouseUpItem = e.target;
      // console.dir(mouseUpItem);
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
      } */
      
      
      // TaskManager.definePlace(e, this.draggedElement, e.target);
      const shiftY = e.clientY - e.target.getBoundingClientRect().top;
      // Определяю порядок вставки элемента: до или после.
      const { y, height } = e.target.getBoundingClientRect();

      const appendPosition =
        y + height / 2 > e.clientY ? 'beforebegin' : 'afterend';
        console.log(`${y} + ${height} / 2 > ${e.clientY} ====> ${appendPosition}`);
    
      if (e.target.classList.contains('note')) {
        e.target.parentElement.insertAdjacentElement(appendPosition, this.draggedElement);
      }
      if (e.target.classList.contains('proection')) {
        e.target.insertAdjacentElement(appendPosition, this.draggedElement);
        // mouseUpElement.remove();
      }
      if (e.target.classList.contains('column')) {
        e.target.querySelector('.content').appendChild(this.draggedElement);
      }

      
      this.proection.remove();
      this.proection = null;
      
      // console.log('mouseup');

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
    // const mouseUpItem = e.target;
    // console.dir(mouseUpItem);
    if (mouseUpElement.classList.contains('note')) {

      // shifts
      const shiftY = e.clientY - e.target.getBoundingClientRect().top;
      // Определяю порядок вставки элемента: до или после.
      const { y, height } = e.target.getBoundingClientRect();

      const appendPosition =
        y + height / 2 > e.clientY ? 'beforebegin' : 'afterend';
        console.log(`${y} + ${height} / 2 > ${e.clientY} ====> ${appendPosition}`);

      mouseUpElement.parentElement.insertAdjacentElement(appendPosition, element);
    
      /* if (e.clientY > mouseUpElement.getBoundingClientRect().top + mouseUpElement.offsetHeight / 2) {
        // e.clientY - shiftY > mouseUpElement.offsetTop + mouseUpElement.offsetHeight / 2
        mouseUpElement
          .closest('.note-wrapper')
          .insertAdjacentElement('afterend', element);
        // mouseUpElement
        //   .closest('.content')
        //   .insertBefore(element, mouseUpElement.parentElement.nextSibling);
      } else {
        // mouseUpElement
        // .closest('.content')
        // .insertBefore(element, mouseUpElement.parentElement);
        // console.log(mouseUpElement.parentElement);
        mouseUpElement
          .parentElement
          .insertAdjacentElement('beforebegin', element);
      } */
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
      // console.log(d);
      return d;
    })();
  }
}
