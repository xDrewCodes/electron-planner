/* FUNCS */
function addTask(title, time) {
    // Create a new div element
    const newDiv = document.createElement('div');
    newDiv.classList.add('task');

    // Create and append the h1 for time
    const h1 = document.createElement('h1');
    h1.textContent = time;
    newDiv.appendChild(h1);

    // Create and append the h1 for title
    const h1_2 = document.createElement('h1');
    h1_2.textContent = title;
    newDiv.appendChild(h1_2);

    // Find the target div (task list)
    const targetDiv = document.getElementsByClassName('task__list')[0];
    
    if (targetDiv) {
        // Append the new task to the target div
        targetDiv.appendChild(newDiv);
    } else {
        console.error('Target div not found!');
    }
}

/* JSON FUNCS */
function setTasks() {
    // Fetch the tasks from the JSON file
    fetch('tasks.json')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                
                let time = new Date(task.startTime)
                m = time.getMinutes()
                if ( m == 0 ) {
                    m = '00'
                }
                time = time.getHours() + ':' + m

                addTask(task.title, time);
            });
        })
        .catch(error => {
            console.error('Error loading the tasks.json file:', error);
        });
}

// Call setTasks to load and display tasks
setTasks();

