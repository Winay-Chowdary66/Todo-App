const todoListEl = document.querySelector('.todo-list');
const form = document.querySelector('.form');
const input = document.querySelector('#user-input');
const addToList = document.querySelector('#add-to-list');
const searchTodo = document.getElementById('search-todo');
const recycle = document.getElementById('recycle');
const alarm = document.querySelector('.date');
const cancel = document.querySelector('#cancel');
const alarmTime = document.querySelector('#alarm-time');
const notify = document.querySelector('.time');
const setAlarm = document.querySelector('.set-alarm');
const alarmAudio = document.querySelector('.alarm-audio');
const offAlarm = document.querySelector('.off-alarm');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	createTodo();
});

let todoValue = JSON.parse(localStorage.getItem('Todo'));
todoValue.forEach((todoo) => {
	createTodo(todoo);
});

addToList.addEventListener('click', () => {
	createTodo();
});

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return text.link(url);
//'<html><body><a href="' + url + '">' + url + '</a></body></html>';
  })
}

function createTodo(todoo) {
	let inputValue = input.value;
	if (todoo) {
		inputValue = todoo.todo;
	}
	if (inputValue) {
                inputValue = urlify(inputValue);
		let createListEls = document.createElement('li');
		let listAttr = document.createAttribute('class');
		listAttr.value = 'list-els';
		createListEls.setAttributeNode(listAttr);
		todoListEl.appendChild(createListEls);
		createListEls.innerText = inputValue;

		let createCheckBox = document.createElement('i');
		let checkBoxClassAttr = document.createAttribute('class');
		checkBoxClassAttr.value = 'far fa-check-circle';
		createCheckBox.setAttributeNode(checkBoxClassAttr);
		todoListEl.appendChild(createCheckBox);

		let createITag = document.createElement('i');
		let createIAttr = document.createAttribute('class');
		createIAttr.value = 'far fa-trash-alt';
		createITag.setAttributeNode(createIAttr);
		todoListEl.appendChild(createITag);

		let createImg = document.createElement('img');
		let createImgAttr = document.createAttribute('src');
		createImgAttr.value = './icons8-alarm-clock-50.png';
		createImg.setAttributeNode(createImgAttr);
		todoListEl.appendChild(createImg);

		createCheckBox.addEventListener('click', () => {
			createCheckBox.classList.toggle('red');
			createListEls.classList.toggle('finished');
			insertIntoLS();
		});

		createITag.addEventListener('click', () => {
			createListEls.remove();
			createCheckBox.remove();
			createITag.remove();
			createImg.remove();
			insertIntoLS();
		});

		createImg.addEventListener('click', () => {
			alarm.classList.add('open');
			cancel.addEventListener('click', () => {
				alarm.classList.remove('open');
			});
		});

		if (todoo && todoo.finished) {
			createListEls.classList.add('finished');
		}

		recycle.addEventListener('click', () => {
			recycle.style.color = 'rgb(86,255,71)';
			localStorage.removeItem('Todo');
			createListEls.remove();
		});

		input.value = '';
		insertIntoLS();
	}
	else {
		alert('Please enter Todo List');
	}
}

function insertIntoLS() {
	const todosEls = document.querySelectorAll('.list-els');

	const todos = [];

	todosEls.forEach((todosEl) => {
		todos.push({
			todo: todosEl.innerText,
			finished: todosEl.classList.contains('finished'),
			time: alarmTime.value
		});
	});

	localStorage.setItem('Todo', JSON.stringify(todos));
}
updateTime();
function updateTime() {
	const li = document.querySelectorAll('li');
	const iconsCheck = document.querySelectorAll('.fa-check-circle');
	const iconsTrash = document.querySelectorAll('.fa-trash-alt');
	const imgAlarm = document.querySelectorAll('img');
	searchTodo.addEventListener('keyup', () => {
		let searchTodoValue = searchTodo.value;
		let searchTodoValueLower = searchTodoValue.toUpperCase();

		for (let i = 0; i < li.length; i++) {
			let todoValue = li[i].textContent.toUpperCase();
			if (todoValue.indexOf(searchTodoValueLower) > -1 || searchTodoValueLower == '  ') {
				searchTodo.style.color = 'green';
				li[i].style.display = 'inline-block';
				iconsCheck[i].style.display = 'inline-block';
				iconsTrash[i].style.display = 'inline-block';
				imgAlarm[i].style.display = 'inline-block';
			}
			else {
				li[i].style.display = 'none';
				iconsCheck[i].style.display = 'none';
				iconsTrash[i].style.display = 'none';
				imgAlarm[i].style.display = 'none';
				searchTodo.style.color = 'red';
			}
		}
	});
}

setAlarm.addEventListener('click', () => {
	let setTym = setInterval(() => {
		let crntTym = new Date();
		//let crntHrsTemp = crntTym.getHours() > 12 ? crntTym.getHours() - 12 : crntTym.getHours();
		let crntHrs = zero(crntTym.getHours());
		let crntMinTemp = crntTym.getMinutes();
		let crntMin = zero(crntMinTemp);
		let crntSec = zero(crntTym.getSeconds());
		function zero(crntTemp) {
			return crntTemp < 10 ? '0' + crntTemp : crntTemp;
		}
		let crntHrsMinSec = crntHrs + ':' + crntMin + ':' + crntSec;
		// console.log(crntHrsMinSec);
		// console.log(alarmTime.value);
		notify.innerText = 'Alarm is set at ' + alarmTime.value;
		if (alarmTime.value === crntHrsMinSec) {
			alarmAudio.play();
		}
		insertIntoLS();
	}, 1000);
});

offAlarm.addEventListener('click', () => {
	if (alarmAudio.play) {
		alarmAudio.pause();
		notify.innerText = 'Alarm Stopped';
	}
});
