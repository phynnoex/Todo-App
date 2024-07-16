// Enable cancel button when hover on the task-description
let tasked = document.querySelectorAll(".tasked");
let cross = document.querySelector("#cross-icon");
let taskHouse = document.getElementById("taskHouse")

taskHouse.addEventListener('mouseenter', () => {
    console.log('entered taskhouse')
    tasked.forEach(element => {
        console.log('lol')
        element.addEventListener('mouseenter', () => {
            console.log('Hovered over task description');
            cross.style.display = 'block';
            element.style.cursor = 'pointer';
     });
        
        element.addEventListener('mouseleave', () => {
            console.log('Mouse left task description');
            cross.style.display = 'none';
        });
    });
})





// Dark-mode function
function switchmode(isLight) {
    let upperBg = document.querySelector(".upper-bg");
    let lowerBg = document.querySelector(".lower-bg");
    let input = document.querySelector(".input");
    let inputText = document.querySelector(".inputText");
    let midDiv = document.querySelector(".middle");
    let tasked = document.querySelectorAll(".tasked");
    let roundedCheckbox = document.querySelectorAll(".lab");
    let footerTask = document.querySelector(".footer");
    let taskStatus = document.querySelector(".task-status");

    if (isLight) {
        upperBg.classList.add('dark-img');
        lowerBg.classList.add('dark-bg');
        input.classList.add('dark-task');
        inputText.classList.add('dark-task');
        midDiv.classList.add('dark-shadow');
        tasked.forEach(element => element.classList.add('dark-task'));
        roundedCheckbox.forEach(element => element.classList.add('dark-checkbox'));
        footerTask?.classList.add('dark-task');
        taskStatus?.classList.add('dark-task');
    } else {
        upperBg.classList.remove('dark-img');
        lowerBg.classList.remove('dark-bg');
        input.classList.remove('dark-task');
        inputText.classList.remove('dark-task');
        midDiv.classList.remove('dark-shadow');
        tasked.forEach(element => element.classList.remove('dark-task'));
        roundedCheckbox.forEach(element => element.classList.remove('dark-checkbox'));
        footerTask?.classList.remove('dark-task');
        taskStatus?.classList.remove('dark-task');
    }
}

let modeSetting = document.querySelector(".modeSetting");
let isLight = true;
modeSetting.innerHTML = `<img src="./images/icon-moon.svg" alt="moon svg">`;

modeSetting.addEventListener('click', () => {
    if (isLight) {
        modeSetting.innerHTML = `<img src="./images/icon-sun.svg" alt="sun svg">`;
    } else {
        modeSetting.innerHTML = `<img src="./images/icon-moon.svg" alt="moon svg">`;
    }
    switchmode(isLight);
    isLight = !isLight;
});

//load task item
let AllTasks = [];
let completedTasks = [];
let activeTasks = []

//tasks class
let taskDescrip = document.querySelector(".inputText");
function Tasks(taskDescription) {
    if (typeof Tasks.currentId === 'undefined') {
        Tasks.currentId = 0;
    }
    this.taskID = ++Tasks.currentId,
    this.taskDescription = taskDescription,
    this.isActive= true
}
function createTodo(){
    let newTask = new Tasks(taskDescrip.value)
    AllTasks.push(newTask)
    activeTasks.push(newTask)
}

//submit button
let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{
    createTodo()
    console.log(AllTasks)
    displayTodo(AllTasks)
    // checkii();
})

//display todolists
function displayTodo(array) {
    taskHouse.innerHTML = '';
    array.forEach(element => {
        const taskElement = document.createElement('div');
        let lightbox = isLight ? 'no' : 'dark-checkbox'
        taskElement.classList.add('tasked', isLight ? 'no': 'dark-task');
        taskElement.innerHTML = `
          <div>
            <input type="checkbox" id="rounded-checkbox-${element.taskID}" class="rounded-checkbox">
            <label for="rounded-checkbox-${element.taskID}" class="lab ${lightbox}">
              <svg class="checkmark-svg" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
              </svg>
            </label>
          </div>
          <label for="doneTask" class="task-descript">${element.taskDescription}</label>
          <a href="#" class="cross-icon" onclick="event.preventDefault();">
            <img src="images/icon-cross.svg" alt="" width="70%">
          </a>
        `;

        taskElement.addEventListener('mouseenter', () => {
            taskElement.querySelector('.cross-icon').style.display = 'block';
            taskElement.style.cursor = 'pointer';
        });

        taskElement.addEventListener('mouseleave', () => {
            taskElement.querySelector('.cross-icon').style.display = 'none';
        });
        

        taskHouse.appendChild(taskElement);
    });

    document.querySelectorAll('.rounded-checkbox').forEach((checkbox) =>{
        checkbox.addEventListener('change',checkii);
    })
}

//toggle to active classes
document.getElementById('activeToggle').addEventListener('click',() => {
    displayTodo(activeTasks);
})
let allchecker = []

function checkii() {
    let currentTasks = document.querySelectorAll('.rounded-checkbox')
    console.log(currentTasks)
    const allchecked = [];

    currentTasks.forEach((checkbox,index) => {
        if (checkbox.checked) {
            allchecked.push(index)
        }
    })

    if (allchecked.length > 0) {
        allchecker =  allchecked;
        console.log(allchecker)
    }else{
        console.log('nothing checked')
    }
    
}
//completed
document.getElementById('completedToggle').addEventListener('click',() => {
    console.log('inside checked')
    completed(allchecker)
})
function completed(completedArray) {
    const completedTasks = completedArray.map((element) => {
        const newArray = AllTasks.find(user => user.taskID == element);
        return newArray;
    });
    
    console.log(completedTasks);
    displayTodo(completedTasks);
    
}


