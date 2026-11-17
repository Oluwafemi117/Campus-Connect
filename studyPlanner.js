
/* ==========================================
   CAMPUS CONNECT - STUDY PLANNER
========================================== */


/* STUDENT STORAGE */

const studentEmail =
    localStorage.getItem("loggedInUser") || "guest";

const storageKey = "studyTasks_" + studentEmail;

let studyTasks =
    JSON.parse(localStorage.getItem(storageKey)) || [];

let currentFilter = "all";
let editingTaskId = null;


/* SELECT HTML ELEMENTS */

const studyForm = document.getElementById("studyForm");

const courseName = document.getElementById("courseName");
const taskDescription = document.getElementById("taskDescription");
const studyDate = document.getElementById("studyDate");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const taskType = document.getElementById("taskType");

const studyTasksContainer =
    document.getElementById("studyTasks");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const studyProgress = document.getElementById("studyProgress");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const addTaskBtn = document.getElementById("addTaskBtn");


/* ==========================================
   DARK MODE AND LIGHT MODE
========================================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("studyPlannerTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

} else {

    themeToggle.textContent = "🌙";

}


/* SWITCH THEME */

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("studyPlannerTheme", "dark");

        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("studyPlannerTheme", "light");

        themeToggle.textContent = "🌙";

    }

});


/* ==========================================
   SAVE STUDY TASKS
========================================== */

function saveTasks() {

    localStorage.setItem(
        storageKey,
        JSON.stringify(studyTasks)
    );

}


/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* ==========================================
   ADD AND EDIT STUDY TASKS
========================================== */

studyForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const course = courseName.value.trim();
    const description = taskDescription.value.trim();
    const date = studyDate.value;
    const start = startTime.value;
    const end = endTime.value;
    const type = taskType.value;

    if (!course || !date || !start || !end || !type) {

        alert("Please fill in all required fields.");

        return;

    }

    if (end <= start) {

        alert("End time must be later than start time.");

        return;

    }


    const existingTask = studyTasks.find(
        task => task.id === editingTaskId
    );

    const taskData = {

        id: editingTaskId || Date.now().toString(),

        course: course,

        description: description,

        date: date,

        startTime: start,

        endTime: end,

        type: type,

        completed: existingTask
            ? existingTask.completed
            : false

    };


    if (editingTaskId) {

        studyTasks = studyTasks.map(task =>

            task.id === editingTaskId
                ? taskData
                : task

        );

        editingTaskId = null;

        addTaskBtn.textContent = "Add to My Schedule";

    } else {

        studyTasks.push(taskData);

    }


    saveTasks();

    studyForm.reset();

    renderTasks();

    alert("Study schedule saved successfully!");

});


/* ==========================================
   DISPLAY STUDY TASKS
========================================== */

function renderTasks() {

    studyTasksContainer.innerHTML = "";

    let filteredTasks = [...studyTasks];

    const today = new Date().toLocaleDateString("en-CA");


    /* FILTER TASKS */

    if (currentFilter === "today") {

        filteredTasks = filteredTasks.filter(
            task => task.date === today
        );

    }

    else if (currentFilter === "upcoming") {

        filteredTasks = filteredTasks.filter(
            task => task.date > today && !task.completed
        );

    }

    else if (currentFilter === "completed") {

        filteredTasks = filteredTasks.filter(
            task => task.completed
        );

    }


    /* SORT TASKS */

    filteredTasks.sort((a, b) => {

        return a.date.localeCompare(b.date) ||

            a.startTime.localeCompare(b.startTime);

    });


    /* EMPTY STATE */

    if (filteredTasks.length === 0) {

        const message = document.createElement("div");

        message.className = "empty-state";

        const heading = document.createElement("h3");

        heading.textContent = "No Study Tasks Found";

        const paragraph = document.createElement("p");

        paragraph.textContent =
            "Add a study task or check another category.";

        message.append(heading, paragraph);

        studyTasksContainer.appendChild(message);

    }


    /* CREATE TASK CARDS */

    filteredTasks.forEach(task => {

        const taskCard = document.createElement("div");

        taskCard.className = "study-task";


        const heading = document.createElement("h3");

        heading.textContent = task.course;


        const description = document.createElement("p");

        description.textContent =
            task.description || "No description added.";


        const date = document.createElement("p");

        date.textContent = "Date: " + formatDate(task.date);


        const time = document.createElement("p");

        time.textContent =
            "Time: " + task.startTime + " - " + task.endTime;


        const type = document.createElement("p");

        type.textContent = "Activity: " + task.type;


        const status = document.createElement("p");

        status.textContent = task.completed
            ? "Status: Completed"
            : "Status: Pending";


        /* COMPLETE BUTTON */

        const completeBtn = document.createElement("button");

        completeBtn.type = "button";

        completeBtn.textContent = task.completed
            ? "Mark as Pending"
            : "Mark as Completed";

        completeBtn.addEventListener("click", function() {

            toggleTask(task.id);

        });


        /* EDIT BUTTON */

        const editBtn = document.createElement("button");

        editBtn.type = "button";

        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {

            editTask(task.id);

        });


        /* DELETE BUTTON */

        const deleteBtn = document.createElement("button");

        deleteBtn.type = "button";

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            deleteTask(task.id);

        });


        taskCard.append(

            heading,

            description,

            date,

            time,

            type,

            status,

            completeBtn,

            editBtn,

            deleteBtn

        );


        studyTasksContainer.appendChild(taskCard);

    });


    updateProgress();

}


/* ==========================================
   MARK TASK COMPLETED OR PENDING
========================================== */

function toggleTask(id) {

    studyTasks = studyTasks.map(task => {

        if (task.id === id) {

            return {

                ...task,

                completed: !task.completed

            };

        }

        return task;

    });

    saveTasks();

    renderTasks();

}


/* ==========================================
   EDIT STUDY TASK
========================================== */

function editTask(id) {

    const task = studyTasks.find(
        task => task.id === id
    );

    if (!task) return;


    courseName.value = task.course;

    taskDescription.value = task.description;

    studyDate.value = task.date;

    startTime.value = task.startTime;

    endTime.value = task.endTime;

    taskType.value = task.type;


    editingTaskId = id;

    addTaskBtn.textContent = "Update Study Task";


    studyForm.scrollIntoView({

        behavior: "smooth"

    });

}


/* ==========================================
   DELETE STUDY TASK
========================================== */

function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this study task?"
    );

    if (!confirmDelete) return;


    studyTasks = studyTasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();

}


/* ==========================================
   UPDATE STUDY PROGRESS
========================================== */

function updateProgress() {

    const total = studyTasks.length;

    const completed = studyTasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;


    const percentage = total === 0

        ? 0

        : Math.round((completed / total) * 100);


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    studyProgress.textContent = percentage + "%";

    progressFill.style.width = percentage + "%";

    progressText.textContent =
        percentage + "% completed";

}


/* ==========================================
   FILTER BUTTONS
========================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

/* MOBILE HAMBURGER MENU */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) {
        console.log("Menu button or navigation not found!");
        return;
    }

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

});

/* ==========================================
   INITIALISE STUDY PLANNER
========================================== */

renderTasks();
