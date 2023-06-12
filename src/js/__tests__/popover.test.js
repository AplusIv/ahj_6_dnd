/**
 * @jest-environment jsdom
 */

import Popover from '../popover';

test('button exists in DOM', () => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="container">
    <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
  </div>
  `
  );
  const element = document.querySelector('button');
  expect(element.classList.contains('btn')).toEqual(true);
});

test('popover is shown', () => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="container">
    <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
  </div>
  `
  );
  const element = document.querySelector('button');
  const popover = new Popover(element);
  popover.showPopover();
  expect(document.querySelector('.popover')).toBeTruthy();
});

test('popover is hidden', () => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="container">
    <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
  </div>
  `
  );
  const element = document.querySelector('button');
  const popover = new Popover(element);
  popover.showPopover();
  popover.hidePopover();
  expect(element.classList.contains('popover-showed')).toEqual(false);
});
