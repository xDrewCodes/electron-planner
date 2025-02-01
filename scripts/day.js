
function setTemplates() {
    // Fetch the tasks from the JSON file
    fetch('../data/templates.json')
    .then(response => response.json())
    .then(templates => {
        const now = new Date();
        let lastTemplateDiv = null
        
        const dayContainer = document.getElementsByClassName('day__templates--container')[0]
        const weekContainer = document.getElementsByClassName('week__templates--container')[0]
        
        let dayTemplates = templates.day.map((template) => {
            return `<div class="day__template--item">${template.templateName}</div>`
        }).join('')
        
        dayContainer.innerHTML = dayTemplates
        
        // Add event listener to each day template item
        const dayTemplateItems = dayContainer.getElementsByClassName('day__template--item');
        for (let item of dayTemplateItems) {
            item.addEventListener('click', function () {
                editTemplate(this, dayContainer, templates);
            });
        }
        
    })
    .catch(error => {
        console.error('Error loading the tasks.json file:', error)
    })
}


function editTemplate(templateEl, dayContainer, templates) {
    
    dayContainer.innerHTML = '';
    
    const template = templates.day.find(t => t.templateName == templateEl.textContent)
    
    dayContainer.innerHTML += `<div class="task__item task__item--current" style="font-size: 20px;">${template.templateName}</div>`;
    
    template.tasks.forEach((t) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task__item';
        taskItem.innerHTML = t.title;
        taskItem.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = t.title;
            taskItem.innerHTML = '';
            taskItem.appendChild(input);
            input.focus();
            input.addEventListener('change', function() {
                taskItem.innerHTML = input.value;
                updateTaskInTemplate(template.templateName, t.title, input.value);
            });
        });
        dayContainer.appendChild(taskItem);
    })
    
}







setTemplates()