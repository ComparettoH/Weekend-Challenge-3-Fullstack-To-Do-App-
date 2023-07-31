$(document).ready(OnReady)

function OnReady (){
console.log('Yay, in OnReady!!!')
// Auto run GET function to display table results
getTaskList();
// Handlers
$('#add2do-btn').on('click', addToDo)


}
let taskList;

// POST function to add task
function addToDo (){
    // console.log('testing addToDo 1234')
    let taskObject = {
        task: $('#taskInput').val(),
        complete: 'false',
    }
    $.ajax({
        type: 'POST',
        url: 'to-do-list',
        data: taskObject
    }).then (function (response) {
        $('#taskInput').val('')
        getTaskList()
    })
}

// GET function
function getTaskList (){
    // console.log('in getTaskList')
    $.ajax({ 
        type: 'GET',
        url: '/to-do-list'
    }).then( function (response) {
        taskList = response;
        render(taskList)
    }).catch((error) => {
        console.log("error with GET,", error);
    })
}


// Render function
function render(){
    $("#viewTaskData").empty();

    // console.log('in render', taskList)
    for (let i = 0; i < taskList.length; i++){
        let newRow = $(`
        <tr>
        <td>${taskList[i].task}</td>
        <td>${taskList[i].complete}</td>
        <td>
            <button class="Complete-btn">
            Complete
            </button>
        </td>
        <td>
            <button class="btn-Delete">
            Delete
            </button>
        </td>`)

        $('#viewTaskData').append(newRow);
    };
}