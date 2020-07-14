//selecting dom elements for manipulation
var input = document.querySelector("input[type = 'text']");
var ul = document.querySelector("ul");
var container = document.querySelector("div");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var pencil = document.querySelector("#pencil");
var goBtn = document.querySelector(".go");
var pitBtn = document.querySelector(".pit");
var saveBtn = document.querySelector(".saveBtn");
var overlay = document.getElementById("overlay")


//function to delete todo if delete span is clicked.
function deleteTodo() {
    for (let span of spans) {
        span.addEventListener("click", function() {
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
}

//function to load todo if list is found in local storage.
function loadTodo() {
    if (localStorage.getItem('todoList')) {
        ul.innerHTML = localStorage.getItem('todoList');
        deleteTodo();
    }
}

//event listener for input to add new todo to the list.
input.addEventListener("keypress", function(keyPressed) {
    if (keyPressed.which === 13) {
        //creating lists and span when enter is clicked
        var li = document.createElement("li");
        var spanElement = document.createElement("span");
        var icon = document.createElement("i");

        var newTodo = this.value;
        this.value = " ";

        icon.classList.add('fas', 'fa-trash-alt');
        spanElement.append(icon);
        ul.appendChild(li).append(spanElement, newTodo);

        deleteTodo();

    }

});

// event listener to linethrough list if clicked
ul.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function() {
    input.classList.toggle('display');
});



//save todolist state so user can access it later
goBtn.addEventListener('click', function() {
    localStorage.setItem('todoList', ul.innerHTML);

});

//clear all todo when clear button is clicked
pitBtn.addEventListener('click', function() {
    ul.innerHTML = "";
    localStorage.removeItem('todoList', ul.innerHTML);
});

//display overlay when tips btn is clicked
saveBtn.addEventListener("click", function() {
    overlay.style.height = "0";
});

//delete todo
deleteTodo();

//load Todo
loadTodo();