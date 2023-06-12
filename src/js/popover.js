export default class Popover {
  constructor(element) {
    this.element = element;
    this.onElementClick = this.onElementClick.bind(this);
    this.element.addEventListener('click', this.onElementClick);
  }

  get creatPopover() {
    const popover = document.createElement('div');
    popover.classList.add('popover');

    const popoverTitle = document.createElement('div');
    popoverTitle.classList.add('popover-title');
    popoverTitle.textContent = this.element.title;
    popover.appendChild(popoverTitle);

    const popoverContent = document.createElement('div');
    popoverContent.classList.add('popover-content');
    popoverContent.textContent = this.element.dataset.content;
    popover.appendChild(popoverContent);

    return popover;
  }

  showPopover() {
    const popover = this.creatPopover;

    console.log(this.element.getBoundingClientRect());
    this.element.classList.add('popover-showed');

    document.querySelector('.container').appendChild(popover);

    const { left, top } = this.element.getBoundingClientRect();

    popover.style.top = `${top - 5 - popover.offsetHeight}px`;
    popover.style.left = `${
      left - popover.offsetWidth / 2 + this.element.offsetWidth / 2
    }px`;
  }

  hidePopover() {
    this.element.classList.remove('popover-showed');

    const popover = document.querySelector('.popover');
    popover.remove();
  }

  onElementClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains('popover-showed')) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }
}
