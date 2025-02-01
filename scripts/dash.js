function setTasks() {
    // Fetch the tasks from the JSON file
    fetch('../data/templates.json')
        .then(response => response.json())
        .then(tasks => {
            const now = new Date();
            let lastTaskDiv = null;

            // Update task times for the current day
            tasks = updateTaskTimes(tasks.day[0].tasks);

            // Clear the task container
            const taskContainer = document.getElementsByClassName('tasks__container')[0];
            if (taskContainer) {
                taskContainer.innerHTML = '';
            } else {
                console.error('Task container not found!');
                return;
            }

            tasks.forEach(task => {
                let taskTime = new Date(task.startTime);
                let hours = taskTime.getHours();
                let minutes = taskTime.getMinutes();
                if (minutes === 0) {
                    minutes = '00';
                }
                let time = hours + ':' + minutes;

                const newDiv = addTask(task.title, time);

                // Check if the current time is between this task and the next task
                if (taskTime <= now) {
                    lastTaskDiv = newDiv;
                }
            });
            
            // Add the class to the last task that has happened
            if (lastTaskDiv) {
                lastTaskDiv.classList.add('task__item--current');
                console.log(now)
            }
        })
        .catch(error => {
            console.error('Error loading the tasks.json file:', error);
        });
}

// Function to update task times for the current day
function updateTaskTimes(tasks) {
    const today = new Date();
    return tasks.map(task => {
        let taskTime = new Date(task.startTime);
        taskTime.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        task.startTime = taskTime.toISOString();
        return task;
    });
}

// Modify addTask to return the created div
function addTask(title, time) {
    // Create a new div element
    const newDiv = document.createElement('div');
    newDiv.classList.add('task__item');

    // Create and append the h1 for time
    const h1 = document.createElement('h1');
    h1.textContent = time;
    newDiv.appendChild(h1);

    // Create and append the h1 for title
    const h1_2 = document.createElement('h1');
    h1_2.textContent = title;
    newDiv.appendChild(h1_2);

    // Find the target div (task list)
    const targetDiv = document.getElementsByClassName('tasks__container')[0];

    if (targetDiv) {
        targetDiv.appendChild(newDiv);
    } else {
        console.error('Target div not found!');
    }

    return newDiv;
}

// Call setTasks to load and display tasks
setTasks();

// Calculate the time until the next minute
const now = new Date();
const secondsUntilNextMinute = 60 - now.getSeconds();

setInterval(setTasks, 1000);








function editSections() {
    const editButton = document.getElementsByClassName('controls__edit')[0];
    if (editButton) {
        let isEditing = false;
        editButton.addEventListener('click', () => {
            const nodes = document.getElementsByClassName('node');
            if (isEditing) {
                // Remove event listeners and reset styles
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].style.filter = '';
                    nodes[i].style.backgroundColor = '';
                    nodes[i].removeEventListener('click', handleClick);
                    nodes[i].removeEventListener('mouseover', mouseOverHandler);
                    nodes[i].removeEventListener('mouseout', mouseOutHandler);
                    console.log('off')
                }
                isEditing = false;
            } else {
                // Add event listeners and set styles
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].style.filter = 'brightness(0.5)';

                    // Add mouseover event to reset filter brightness
                    const mouseOverHandler = () => {
                        nodes[i].style.filter = 'brightness(1)';
                    };
                    nodes[i].addEventListener('mouseover', mouseOverHandler);

                    // Add mouseout event to set filter brightness back to 0.5
                    const mouseOutHandler = () => {
                        nodes[i].style.filter = 'brightness(0.5)';
                    };
                    nodes[i].addEventListener('mouseout', mouseOutHandler);

                    // Add click event to handle click
                    const handleClick = () => {
                        // Your click handling logic here
                    };
                    nodes[i].addEventListener('click', handleClick);
                }
                isEditing = true;
                console.log('on')
            }
        });
    } else {
        console.error('Edit button not found!');
    }
}

// Call editSections to set up the event listener
editSections();