const addTask = document.querySelector('.add-task-btn');
const taskName = document.querySelector('.task-name-input');
const taskDes = document.querySelector('.task-des-input');
const taskDate = document.querySelector('.task-date-input');
const taskTime = document.querySelector('.task-time-input');

const taskName1 = document.querySelector('.task-name-input1');
const taskDes1 = document.querySelector('.task-des-input1');
const taskDate1 = document.querySelector('.task-date-input1');
const taskTime1 = document.querySelector('.task-time-input1');

const addedTask = document.querySelector('.added-task-name');
const form = document.querySelector('.form-add-task');
const row = document.querySelector('.row1');
const updateBtn = document.querySelector('.update-task-btn1');
let id = 1;

// Function to generate a unique ID
function generateID() {
    return id++;
}

function updateTaskColors() {
    const addedTasks = document.querySelectorAll('.added-tasks');
    const currentTime = new Date();

    addedTasks.forEach((task) => {
        const taskTime = task.querySelector('.taskTime').innerHTML.trim();
        const taskDate = task.querySelector('.taskDate').innerHTML.trim();
        const selectedDateTime = new Date(`${taskDate}T${taskTime}`);
        selectedDateTime.setSeconds(0); // Remove the seconds from the comparison
        selectedDateTime.setMilliseconds(0); // Remove the milliseconds from the comparison

        if (selectedDateTime < currentTime) {
            task.style.backgroundColor = "#ED2B2A";
            task.style.cursor = "not-allowed";
            // Disable the div and its buttons
            task.disabled = true;
            const buttons = task.querySelectorAll('button');
            buttons.forEach((button) => {
                button.disabled = true;
            });

        } else {
            task.style.backgroundColor = "";
            task.style.cursor = "default";
            // Enable the div and its buttons
            task.disabled = false;
            const buttons = task.querySelectorAll('button');
            buttons.forEach((button) => {
                button.disabled = false;
            });

        }
    });
}

addTask.addEventListener('click', (e) => {
    let task = taskName.value;
    let taskDesc = taskDes.value;
    let tasktime = taskTime.value;
    let taskdate = taskDate.value;

    e.preventDefault();

    if (!task) {
        alert('Please enter the task name');
    } else if (!taskDesc) {
        alert('!Please enter the task description');
    } else if (!taskdate) {
        alert('Please select the date');
    } else if (!tasktime) {
        alert('Please select the time');
    } else {
        const taskId = generateID();

        const currentTime = new Date();
        const selectedDateTime = new Date(`${taskdate}T${tasktime}`);
        const isTimePassed = selectedDateTime < currentTime;
        const task1 = document.createElement("div");
        task1.classList.add("col", "added-tasks");
        task1.setAttribute("id", `task-${taskId}`);
        task1.setAttribute("data-id", taskId);
        let taskid = document.createElement("h3");
        taskid.classList.add("task-id")
        taskid.innerText = taskId;
        task1.appendChild(taskid);
        const task2 = document.createElement("div");
        task2.classList.add("task");
        const task_heading = document.createElement("h3");
        task_heading.classList.add("added-task-name");
        task_heading.innerText = 'Task Name';
        const task3 = document.createElement("p");
        task3.classList.add("taskName");
        task2.appendChild(task_heading);
        task3.innerHTML = task;
        task2.appendChild(task3);


        const task_Description = document.createElement("div");
        task_Description.classList.add("task");
        const task_desc = document.createElement("h3");
        task_desc.classList.add("added-task-description");
        task_desc.innerText = 'Task Description';
        task_Description.appendChild(task_desc);
        const task4 = document.createElement("p");
        task4.classList.add('taskDescription');
        task4.innerHTML = taskDesc;
        task_Description.appendChild(task4);

        const task_Date = document.createElement("div");
        task_Date.classList.add("task");
        const task_date = document.createElement("h3");
        task_date.classList.add("added-task-date");
        task_date.innerText = 'Task Date';
        task_Date.appendChild(task_date);
        const task5 = document.createElement("p");
        task5.classList.add('taskDate');
        task5.innerHTML = taskdate;
        task_Date.appendChild(task5);

        const task_Time = document.createElement("div");
        task_Time.classList.add("task");
        const task_time = document.createElement("h3");
        task_time.classList.add("added-task-time");
        task_time.innerText = 'Task Time';
        task_Time.appendChild(task_time);
        const task6 = document.createElement("p");
        task6.classList.add('taskTime');
        task6.innerHTML = tasktime;
        task_Time.appendChild(task6);

        const action = document.createElement("div");
        const editBtn = document.createElement("button");
        editBtn.innerText = 'Edit';
        editBtn.classList.add("btn", "edit-btn");
        editBtn.setAttribute("data-bs-target", "#exampleModal");
        editBtn.setAttribute("data-bs-toggle", "modal");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add("btn", "delete-btn");

        action.appendChild(editBtn);
        action.appendChild(deleteBtn);

        task1.appendChild(task2);
        task1.appendChild(task_Description);
        task1.appendChild(task_Date);
        task1.appendChild(task_Time);
        task1.appendChild(action);
        row.appendChild(task1);

        taskName.value = "";
        taskDes.value = "";
        taskDate.value = "";
        taskTime.value = "";
        let b = row.innerHTML;
        localStorage.setItem("key", b);
        updateTaskColors(); // Call the function to update task colors
    }
});

// window.addEventListener("click", (e) => {
//     if (e.target.innerText == "Delete") {
//         e.target.parentNode.parentNode.remove();
//         localStorage.setItem("key", row.innerHTML);
//     }
// });

window.addEventListener("click", (e) => {
    if (e.target.innerText == "Delete") {
        const taskNode = e.target.parentNode.parentNode;
        const taskId = taskNode.getAttribute("data-id");
        taskNode.remove();

        // Update the ID order
        const tasks = Array.from(row.children);
        tasks.forEach((task, index) => {
            const taskIdNode = task.querySelector('.task-id');
            taskIdNode.innerText = index + 1;
        });

        // Store the updated task list in local storage
        localStorage.setItem("key", row.innerHTML);
    }
});


let id1;
window.addEventListener("click", (e) => {
    if (e.target.innerText == "Edit") {
        let selectedRow = e.target.parentNode.parentNode;
        id1 = selectedRow.querySelector('.task-id');
        //id1 = selectedRow.getAttribute("data-id");
        id1 = id1.innerText;
        let a = selectedRow.querySelectorAll(".task");
        let b = a[0];
        let c = a[1];
        let d = a[2];
        let f = a[3];

        let taskname1 = b.querySelector('.taskName');
        taskname1 = taskname1.innerText
        let taskdescription1 = c.querySelector('.taskDescription');
        taskdescription1 = taskdescription1.innerText;
        let taskdate1 = d.querySelector('.taskDate');
        taskdate1 = taskdate1.innerText;
        let tasktime1 = f.querySelector('.taskTime');
        tasktime1 = tasktime1.innerText;

        const modal = document.getElementById('exampleModal');

        function setModalFormValues(name, des, date, time) {
            const tasknameInput = modal.querySelector('#name');
            const taskdescriptionInput = modal.querySelector('#des');
            const taskdateInput = modal.querySelector('#date');
            const tasktimeInput = modal.querySelector('#time');

            tasknameInput.value = name;
            taskdescriptionInput.value = des;
            taskdateInput.value = date;
            tasktimeInput.value = time;
        }
        const tasknameInput = taskname1;
        const taskdescriptionInput = taskdescription1;
        const taskdateInput = taskdate1;
        const tasktimeInput = tasktime1;
        setModalFormValues(tasknameInput, taskdescriptionInput, taskdateInput, tasktimeInput);
    }
});

updateBtn.addEventListener('click', (e) => {
    let task = taskName1.value;
    let taskDesc = taskDes1.value;
    let tasktime = taskTime1.value;
    let taskdate = taskDate1.value;
    let row1 = row.querySelectorAll(".added-tasks");
    // let index = 0;
    let index1 = id1 - 1;
    // while (index < row1.length) {
    //     let row2 = row1[index];
    //     row2 = row2.querySelector('.task');
    //     row2 = row2.querySelector('.taskName');
    //     row2 = row2.innerText;
    //     if (row2 === task) {
    //         index1 = index;
    //         break;
    //     } else {
    //         index++;
    //     }
    // }

    let findedtask = row1[index1];
    let a = findedtask.querySelectorAll(".task");
    let b = a[0];
    let c = a[1];
    let d = a[2];
    let f = a[3];
    let taskname2 = b.querySelector('.taskName');
    taskname2.innerHTML = task
    let taskdescription2 = c.querySelector('.taskDescription');
    taskdescription2.innerHTML = taskDesc
    let taskdate2 = d.querySelector('.taskDate');
    taskdate2.innerHTML = taskdate;
    let tasktime2 = f.querySelector('.taskTime');
    tasktime2.innerHTML = tasktime;
    localStorage.setItem("key", row.innerHTML);
    closeModal();
    updateTaskColors(); // Call the function to update task colors
});

// Close the modal
function closeModal() {
    const modal = document.getElementById("exampleModal");
    const backdrop = document.querySelector(".modal-backdrop");

    modal.classList.remove("show");
    setTimeout(function() {
        modal.style.display = "none";

        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
    }, 500);
}

window.addEventListener("load", (event) => {
    let a = localStorage.getItem("key");
    row.innerHTML = a;
    updateTaskColors();
});