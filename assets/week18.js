    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearListBtn = document.getElementById('clearListBtn');
    const noTasksMessage = document.getElementById('noTasksMessage');

    // Проверяем есть ли данные в localStorage. Если есть парсим их, если нет создаем пустой массив
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Сохраняем текущее состояние массива tasks в локальное хранилище браузера, преобразуя его в строку JSON
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Определяется функция displayTasks, которая отображает текущие задачи в списке taskList на основе данных из массива tasks
    function displayTasks() {
        taskList.innerHTML = ''; // Очищаем содержимое элемента taskList
        if (tasks.length === 0) { // Проверяем, если массив tasks пуст
            noTasksMessage.classList.remove('hidden'); // Убираем класс 'hidden' у сообщения noTasksMessage
            clearListBtn.disabled = true; // Делаем кнопку clearListBtn неактивной
        } else { // Если массив tasks не пустой
            noTasksMessage.classList.add('hidden'); // Добавляем класс 'hidden' сообщению noTasksMessage (т.е. делаем его невидимым)
            clearListBtn.disabled = false; // Делаем кнопку clearListBtn активной
            tasks.forEach(function(task, index) { // Перебираем массив tasks
                const li = document.createElement('li'); // Создаем элемент списка <li>
                const checkbox = document.createElement('input'); // Создаем элемент <input> для чекбокса
                checkbox.type = 'checkbox'; // Устанавливаем тип чекбокса
                const label = document.createElement('label'); // Создаем элемент <label>
                label.textContent = task; // Устанавливаем текст для label равным текущему task
                li.appendChild(label); // Добавляем чекбокс в элемент списка <li>
                li.appendChild(checkbox); // Добавляем label в элемент списка <li>
                taskList.appendChild(li); // Добавляем элемент списка <li> в taskList

                checkbox.addEventListener('change', function() { // Добавляем обработчик события изменения состояния чекбокса
                    if (checkbox.checked) { // Проверяем отмечен ли чекбоксб если да, то 
                        label.style.textDecoration = 'line-through'; // Делаем текст label перечеркнутым
                    } else { // Если нет
                        label.style.textDecoration = 'none'; // Убираем перечеркивание, если чекбокс не отмечен
                    }
                    tasks[index] = task; // Обновляем значение task в массиве tasks
                    updateLocalStorage(); // Вызываем функцию для обновления localStorage
                });
            });
        }
    }

    // Add task
    addTaskBtn.addEventListener('click', function() { // Добавляем обработчик события ина кнопку addTaskBtn, когда на нее кликают случается следущее:
        const taskText = taskInput.value.trim(); // Создается переменная taskText, которая содержит значение поля ввода taskInput, очищенное от начальных и конечных пробелов с помощью метода trim()
        if (taskText !== '') { // Если переменная taskText не пустая, то выполняется следующий блок
            tasks.push(taskText); // Значение taskText добавляется в конец массива tasks
            updateLocalStorage(); // Вызывается функция updateLocalStorage(), которая обновляет данные в localStorage, сохраняя новый список задач
            displayTasks(); // Вызывается функция displayTasks(), чтобы перерисовать список задач на странице с учетом новой задачи
            taskInput.value = ''; // Поле ввода taskInput очищается, готовясь к вводу новой задачи
        }
    });


    clearListBtn.addEventListener('click', function() {
        tasks = []; // Удаляем все задачи
        updateLocalStorage(); //Вызывается функция updateLocalStorage(), которая обновляет данные в localStorage, сохраняя пустой массив tasks, что приведет к удалению всех задач из локального хранилища браузера
        displayTasks(); // выводим пользователю пустой планировщик
    });


    displayTasks();

