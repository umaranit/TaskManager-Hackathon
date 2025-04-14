/* script.js */
$(document).ready(function() {
    function updateTaskStats() {
        const totalTasks = $('#taskList li').length;
        const completedTasks = $('#taskList li.completed').length;
        $('#totalTasks').text(totalTasks);
        $('#completedTasks').text(completedTasks);
    }

    function addTask(taskText, priority, dueDate) {
        const taskItem = $(
            `<li>
                <span class="task-text">${taskText}</span>
                <span class="task-priority">[${priority}]</span>
                <span class="task-due-date">Due: ${dueDate}</span>
                <div class="task-buttons">
                    <button class="complete">Complete</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </li>`
        );

        $('#taskList').append(taskItem);
        updateTaskStats();
    }

    $('#taskForm').on('submit', function(event) {
        event.preventDefault();
        const taskText = $('#taskInput').val();
        const priority = $('#taskPriority').val();
        const dueDate = $('#taskDueDate').val();
        if (taskText && dueDate) {
            addTask(taskText, priority, dueDate);
            $('#taskInput').val('');
            $('#taskDueDate').val('');
        }
    });

    $('#taskList').on('click', '.complete', function() {
        $(this).closest('li').toggleClass('completed');
        updateTaskStats();
    });

    $('#taskList').on('click', '.edit', function() {
        const taskText = $(this).closest('li').find('.task-text');
        const newText = prompt('Edit task:', taskText.text());
        if (newText) {
            taskText.text(newText);
        }
    });

    $('#taskList').on('click', '.delete', function() {
        $(this).closest('li').remove();
        updateTaskStats();
    });

    $('#searchInput').on('input', function() {
        const searchText = $(this).val().toLowerCase();
        $('#taskList li').each(function() {
            const taskText = $(this).find('.task-text').text().toLowerCase();
            $(this).toggle(taskText.includes(searchText));
        });
    });

    $('#sortByPriority').on('click', function() {
        const tasks = $('#taskList li').get();
        tasks.sort(function(a, b) {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            const priorityA = $(a).find('.task-priority').text().match(/\[(.*?)\]/)?.[1] || 'Low';
            const priorityB = $(b).find('.task-priority').text().match(/\[(.*?)\]/)?.[1] || 'Low';
            return (priorityOrder[priorityA] || 3) - (priorityOrder[priorityB] || 3);
        });
        $('#taskList').empty().append(tasks);
    });

    $('#sortByDueDate').on('click', function() {
        const tasks = $('#taskList li').get();
        tasks.sort(function(a, b) {
            const dateA = new Date($(a).find('.task-due-date').text().replace('Due: ', '').trim() || '9999-12-31');
            const dateB = new Date($(b).find('.task-due-date').text().replace('Due: ', '').trim() || '9999-12-31');
            return dateA - dateB;
        });
        $('#taskList').empty().append(tasks);
    });

    $('#clearAllTasks').on('click', function() {
        $('#taskList').empty();
        updateTaskStats();
    });

    updateTaskStats();
});