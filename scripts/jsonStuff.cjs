
const fs = require('fs');
const path = require('path');

function updateTaskInTemplate(templateName, oldTitle, newTitle) {
    const filePath = path.join(__dirname, '../data/templates.json');

    // Read the templates.json file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the templates.json file:', err);
            return;
        }

        // Parse the JSON data
        let templates = JSON.parse(data);

        // Find the template
        let template = templates.day.find(t => t.templateName === templateName);
        if (template) {
            // Find the task and update its title
            let task = template.tasks.find(task => task.title === oldTitle);
            if (task) {
                task.title = newTitle;

                // Write the updated templates back to the file
                fs.writeFile(filePath, JSON.stringify(templates, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to the templates.json file:', err);
                    } else {
                        console.log('Task title updated successfully');
                    }
                });
            }
        }
    });
}

setTemplates();