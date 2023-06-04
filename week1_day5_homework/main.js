console.log('we are connected');

class Task {
    constructor(task_name) {
      this.task_name = task_name;
    }
  
    static fromJSON(json) {
      return new Task(json.task_name);
    }
  }
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.task_name = document.getElementById('task-input');
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
      this.tableBody = document.getElementById('table-body');
      this.tasks = [];
      this.loadTasksFromLocalStorage();
      this.renderTaskTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      if (
        this.task_name.value == ''
      ) {
        return;
      } this.tableBody
  
      const task = new Task(this.task_name.value);
  
      this.tasks.push(task);
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
  
      this.task_name.value = '';

    }
  
    renderTaskTable() {
     this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        const tr = this.createTaskTableRow(task);
        this.tableBody.appendChild(tr);
      }
    }
  
    createTaskTableRow(task) {
      const tr = document.createElement('tr');
  
      const tdTask_name = document.createElement('td');
      const tdComplete = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdTask_name.innerHTML = task.task_name;
      
      const completeButtons = this.createCompleteButtons();
      tdComplete.appendChild(completeButtons);

      const actionButtons = this.createActionButtons(task);
      tdActions.appendChild(actionButtons[0]);
      tdActions.appendChild(actionButtons[1]);
  
      tr.appendChild(tdTask_name);
      tr.appendChild(tdComplete);
      tr.appendChild(tdActions);
     
  
      return tr;
    }
  
    createActionButtons(task) {
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
  
      deleteButton.setAttribute('class', 'bi bi-trash');
      deleteButton.addEventListener('click', () =>
        this.onRemoveTaskClicked(task)
      );
  
      //editButton.innerHTML = ' ';
      editButton.setAttribute('class', 'bi bi-pencil mx-1');
      editButton.addEventListener('click', () => this.onEditTaskClicked(task));
  
      return [deleteButton, editButton];
    }

    createCompleteButtons() {
        const completeButton = document.createElement('input');
        completeButton.type = "radio";
        return completeButton;
      }
  
    onRemoveTaskClicked(task){
      this.tasks = this.tasks.filter((x) => {
        return task.task_name !== x.task_name;
      });
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }
  
    onEditTaskClicked(task) {
      this.tasks = this.tasks.filter((x) => {
        return task.task_name !== x.task_name;
      });
  
      this.task_name.value = task.task_name;
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }
  
    saveTasksToLocalStorage() {
      const json = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', json);
    }
  
    loadTasksFromLocalStorage() {
      const json = localStorage.getItem('tasks');
      if (json) {
        const taskArr = JSON.parse(json);
        this.tasks = taskArr.map((x) => Task.fromJSON(x));
      }
    }
  }
  
  const ui = new UI();
  