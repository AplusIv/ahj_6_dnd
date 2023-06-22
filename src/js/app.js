// import Popover from './popover';

import TaskManager from "./taskManager";

// const btn = document.querySelector('button');

// const popover = new Popover(btn);

const container = document.querySelector('.container');

const taskManager = new TaskManager(container);

console.log(taskManager);

taskManager.bindToDom();