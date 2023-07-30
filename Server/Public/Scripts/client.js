$(document).ready(OnReady)

function OnReady (){
console.log('Yay, in OnReady!!!')
// Handlers
$('#add2do-btn').on('click', addToDo)

// Auto run GET function to display table results
}
let taskList;


function addToDo (){
    console.log('testing addToDo 1234')
}

// GET function
function getTaskList (){
    console.log('in getTaskList')
    $.ajax({ 
        type: 'GET',
        url: '/to-do-list'
    }).then((response) => {
        console.log(response);
       taskList = response;
    }).catch((error) => {
        console.log("error with GET,", error);
    })
}


// Render to update DOM
function render(){
    for (toDo of taskList){
        console.log('in render', taskList)
        let newRow = $(`
        <tr>
        <td>${toDo.task}</td>
        <td>${toDo.complete}</td>
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
    }
}