
function createCard()
{
    // carrega o elemento 
    fetch('./Cards/index.html')
    .then(response => response.text())
    .then(html => {
        // Cria um novo elemento div
        var newCardContainer = document.createElement('div');
        newCardContainer.innerHTML = html;

        // Adiciona o card à div "taskList"
        document.querySelector('.taskList').appendChild(newCardContainer.firstChild);
    });
}

function addTask(element) {

    // Pegando o card
    //var card = element.parentNode.querySelector('.taskListBody');
    var card = element.parentNode.parentNode;
    var cardTaskBody = card.querySelector('.taskListBody');

    // Pegando o nome da task
    var newTask = prompt('Type the task:');

    if (newTask.trim() == "")
    {
        window.alert("You cannot add a task whithout a valid description!!!");
        return;
    }

    // Criando o elemento HTML da task
    var taskDiv = document.createElement('div');

    // criando linha editável
    var taskP = document.createElement('p');
    taskP.textContent = newTask;
    taskP.setAttribute('contenteditable', true);

    // criando checkbox
    var taskCheckBox = document.createElement('input');
    taskCheckBox.setAttribute('type', "checkbox");

    // criando botão de deleção de itens de tarefa
    var taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = "Delete";

    taskDeleteButton.onclick = function () {
        
        //criar painel de confirmação
        fetch('./Dialogs/confirmDeletionDialog.html')
        .then(response => response.text())
        .then(html => {

            taskDeleteButton.disabled = true;

            var confirmationPanel = document.createElement('div');
            confirmationPanel.innerHTML = html;
            
            var confirmDeletionDiv = confirmationPanel.querySelector('.confirmDialogButtons');

            var yesButton = document.createElement('button');
            yesButton.textContent = "Yes";

            yesButton.onclick = function() {
                deleteTask(taskDiv);
                updateCounOfTasks(card);
                document.body.removeChild(confirmationPanel); // Remover o painel de confirmação após clicar em Yes
                taskDeleteButton.disabled = false;
            };

            var noButton = document.createElement('button');
            noButton.textContent = "No";

            noButton.onclick = function() {
            document.body.removeChild(confirmationPanel); // Remover o painel de confirmação após clicar em No
            taskDeleteButton.disabled = false;
            };

            confirmDeletionDiv.appendChild(yesButton);
            confirmDeletionDiv.appendChild(noButton);
            document.body.appendChild(confirmationPanel);

            var confirmDeletionParent = confirmationPanel.querySelector('.parentDialog');
            var confirmDeletionTitle = confirmationPanel.querySelector('.titleDialog');

            confirmDeletionTitle.addEventListener('mousedown', (event) => {

                let startX = event.clientX;
                let startY = event.clientY;
            
                let offsetX, offsetY;
            
                const mouseMove = (event) => {
                    offsetX = event.clientX - startX;
                    offsetY = event.clientY - startY;
            
                    confirmDeletionParent.style.left = (confirmDeletionParent.offsetLeft + offsetX) + 'px';
                    confirmDeletionParent.style.top = (confirmDeletionParent.offsetTop + offsetY) + 'px';
            
                    startX = event.clientX;
                    startY = event.clientY;
                };
            
                const mouseUp = () => {
                    document.removeEventListener('mousemove', mouseMove);
                    document.removeEventListener('mouseup', mouseUp);
                };
            
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            });
            
                       
        });
    }

    taskDiv.appendChild(taskP);
    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(taskDeleteButton);

    cardTaskBody.appendChild(taskDiv);
    updateCounOfTasks(card);
}

function deleteCard(element)
{
    //criar painel de confirmação
    fetch('./Dialogs/confirmDeletionCardDialog.html')
    .then(response => response.text())
    .then(html => {

        element.disabled = true;

        var confirmationPanel = document.createElement('div');
        confirmationPanel.innerHTML = html;
            
        var confirmDeletionDiv = confirmationPanel.querySelector('.confirmDialogButtons');

        var yesButton = document.createElement('button');
        yesButton.textContent = "Yes";

        yesButton.onclick = function() {
            var card = element.parentNode.parentNode;
            var taskList = card.parentNode;
            document.body.removeChild(confirmationPanel); // Remover o painel de confirmação após clicar em Yes
            taskList.removeChild(card);
            element.disabled = false;
        };

        var noButton = document.createElement('button');
        noButton.textContent = "No";

        noButton.onclick = function() {
            document.body.removeChild(confirmationPanel); // Remover o painel de confirmação após clicar em No
            element.disabled = false;
            };

        confirmDeletionDiv.appendChild(yesButton);
        confirmDeletionDiv.appendChild(noButton);
        document.body.appendChild(confirmationPanel);

        var confirmDeletionParent = confirmationPanel.querySelector('.parentDialog');
        var confirmDeletionTitle = confirmationPanel.querySelector('.titleDialog');

        confirmDeletionTitle.addEventListener('mousedown', (event) => {

            let startX = event.clientX;
            let startY = event.clientY;
        
            let offsetX, offsetY;
        
            const mouseMove = (event) => {
                offsetX = event.clientX - startX;
                offsetY = event.clientY - startY;
        
                confirmDeletionParent.style.left = (confirmDeletionParent.offsetLeft + offsetX) + 'px';
                confirmDeletionParent.style.top = (confirmDeletionParent.offsetTop + offsetY) + 'px';
        
                startX = event.clientX;
                startY = event.clientY;
            };
        
            const mouseUp = () => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
            };
        
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        });
    })
}

function updateCounOfTasks(card)
{
    var cardTaskBody = card.querySelector('.taskListBody');
    var taskCounter = card.querySelector('.taskCounter');
    var countOfTasks = cardTaskBody.querySelectorAll('div').length;

    if (countOfTasks == 1)
    {
        taskCounter.textContent = countOfTasks + ' Task';
    }
    else if (countOfTasks > 1)
    {
        taskCounter.textContent = countOfTasks + ' Tasks';
    }
    else {
        taskCounter.textContent = '0 Tasks';
    }
}

function deleteTask(taskDiv)
{
    // Obtendo o elemento pai de taskDiv
    var parentElement = taskDiv.parentNode;

    // Removendo taskDiv do DOM
    parentElement.removeChild(taskDiv);
}