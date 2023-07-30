$(document).ready(OnReady)

function OnReady (){
console.log('Yay, in OnReady!!!')
getTaskList();
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