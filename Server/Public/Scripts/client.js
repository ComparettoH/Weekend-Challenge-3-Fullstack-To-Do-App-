$(document).ready(OnReady)

function OnReady (){
console.log('Yay, in OnReady!!!')
// Auto run GET function to display table results
getTaskList();
// Handlers
$('#add2do-btn').on('click', addToDo)
$('#viewTaskData').on('click', '.Complete-btn', completeTask)
$('#viewTaskData').on('click', '.btn-Delete', deleteTask)
}
let taskList;

// PUT function to mark a task completed
function completeTask () {
    // console.log('in complete Task 987')
    const taskId = $(this).parent().parent().data('id')
    console.log("will update task with id:", taskId)
    $.ajax({
        method: 'PUT',
        url: `/completetask/${taskId}`
    }).then((response) => {
        console.log(`task marked completed id: ${taskId}`)
        getTaskList()
    })
}



// DELETE function to remove task from database
function deleteTask () {
    console.log("You clicked on:", $(this))
    //getter
    const taskId = $(this).parent().parent().data('id') 
    //  console.log("in deleteTask: id is...", taskId)

    $.ajax({
        method: 'DELETE',
        url: `/deletetask/${taskId}`
    }).then((response) => {
        console.log(`Deleted task id: ${taskId}`)
        getTaskList()
    })
}


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
    $("#viewTaskData").empty();
    $.ajax({ 
        type: 'GET',
        url: '/to-do-list'
    }).then( function (response) {
        console.log("GET /toDoTable response:", response);
        for (let i = 0; i < response.length; i++){
            let newRow = $(`
            <tr>
            <td>${response[i].task}</td>
            <td>${response[i].complete}</td>
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
    
            // setter
            newRow.data('id',response[i].id)
            $('#viewTaskData').append(newRow);
        };
    })
}


// Render function to aid with CSS changes when complete status is true
function render(){
    
}