import TaskManager from './TaskManager';

const container = document.querySelector('.container');

const taskManager = new TaskManager(container);

taskManager.bindToDom();

window.addEventListener('beforeunload', () => {
  if (document.querySelector('.close')) {
    document.querySelector('.close').remove();
  }

  const storageData = [];
  const contentData = document.querySelectorAll('.column');
  contentData.forEach((data) => {
    const key = data.querySelector('.title').textContent;
    const value = data.querySelector('.content').innerHTML;
    storageData.push({ [key]: value });
  });

  localStorage.setItem('storageData', JSON.stringify(storageData));
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('storageData')) {
    const jsonData = localStorage.getItem('storageData');
    let dataArray;

    try {
      dataArray = JSON.parse(jsonData);
    } catch (error) {
      console.log(error);
    }

    dataArray.forEach((data) => {
      const key = Object.keys(data)[0];
      const value = Object.values(data)[0];

      const titleElement = document.querySelector(`[name="${key}"]`);
      titleElement.closest('.column').querySelector('.content').innerHTML =
        value;
    });
  }
});
