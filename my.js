//selecting dom elements for manipulation
var input = document.querySelector("input[type = 'text']");
var ul = document.querySelector("ul");
var container = document.querySelector("div");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var spansDelete = document.getElementsByClassName("spanDelete");
var spansFolder = document.getElementsByClassName("spanFolder");
var pencil = document.querySelector("#pencil");
var saveBtn = document.querySelector(".save");
var clearBtn = document.querySelector(".clear");
var overlay = document.getElementById("overlay")


//function to delete todo if delete span is clicked.
function deleteTodo() {
    for (let span of spansDelete) {
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
        spanElement.classList.add('spanDelete');
        var icon = document.createElement("i");

        var newTodo = this.value;
        this.value = " ";

        icon.classList.add('fas', 'fa-trash-alt');
        spanElement.append(icon);

        var spanElementFolder = document.createElement("span");
        spanElementFolder.classList.add('spanFolder');
        var iconFolder = document.createElement("i");


        iconFolder.classList.add('fas', 'fa-folder');
        spanElementFolder.append(iconFolder);
        ul.appendChild(li).append(spanElement, spanElementFolder, newTodo);

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
saveBtn.addEventListener('click', function() {
    localStorage.setItem('todoList', ul.innerHTML);

});

//clear all todo when clear button is clicked
clearBtn.addEventListener('click', function() {
    ul.innerHTML = "";
    localStorage.removeItem('todoList', ul.innerHTML);
});
//delete todo
deleteTodo();

//load Todo
loadTodo();