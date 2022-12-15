let buttons = document.querySelectorAll('button');
let add = buttons[0];
let input = document.querySelector('input');
let listsArray = [];
let textPlaceHolder = document.querySelector('.textPlaceHolder')
let taskListsArea = document.querySelector('.taskListsArea');
let task = document.querySelector('.task')
let val = input.value;

let clear = document.querySelector('#clearAll');
clear.style.display = 'none'

add.addEventListener('click', function(){
    
    addItem();
    displayLists();
    input.value = ''
    input.focus();

})


input.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){

        addItem();
        displayLists();
        input.value = ''
  
    } 
  
})


function addItem(){
    val = input.value;

    if(val.trim() !== '' && val !== undefined && val !== null && taskLists.length < 20){
        
    taskLists.push(val);

    localStorage.setItem('listItems', JSON.stringify(taskLists));
    }

   

    if(taskLists.length === 20){
        task.innerText = 'Limited to 20 tasks only';
        task.style.color = 'red'
        task.style.animation = 'shake .5s  ease-in'
        setTimeout(() =>{
            task.innerText = 'Add new task:'
            task.style.color = 'white';
            task.style.animation = 'none'
        }, 1500)
    }

    
    let listItems = JSON.parse(localStorage.getItem('listItems'));

    if(listItems === null){
        taskLists = [];
    } else{
        taskLists = listItems
    }
}


function displayLists() {
  
    let listItems = JSON.parse(localStorage.getItem('listItems'));
    let output = ''
    
    if(listItems === null || listItems.length === 0){
        textPlaceHolder.display = 'flex'
        textPlaceHolder.innerText = 'Your tasks will be listed here...'
        taskLists = [];
     
    } 

    else{
        textPlaceHolder.display = 'none'
        textPlaceHolder.innerText = ''
        taskLists = listItems;


        taskLists.forEach((item, index) =>{
            output += `
                
            <div class="itemContainer">
                <p class="item" id="${index}"> ${index+1}. ${item}</p>
                <div class="buttonContainer">
                    <input type="text" value="${item}" class="editInput">
                    <i class="bi bi-pencil" id="edit" onClick="editText(${index})"></i>
                    <i class="bi bi-trash" id="delete" onClick="deleteItem(${index})"></i> 
                </div>
            </div>
      
            `;
         
        })
    
    
    
        textPlaceHolder.innerHTML = output
        let clear = document.querySelector('#clearAll');
        clear.style.display = 'none'
        if(taskLists.length > 1){
            clear.style.display = 'flex';
        } 
        
        else{
            clear.style.display = 'none'
        }
        
        clear.addEventListener('click', clearAll);
    }
}



clearAll = () =>{
    let clear = document.querySelector('#clearAll');
    clear.style.display = 'none'
    let listItems = JSON.parse(localStorage.getItem('listItems'));
    localStorage.setItem('listItems', JSON.stringify(taskLists));
    localStorage.clear();
    displayLists();

}
deleteItem = (index) =>{
    let listItems = JSON.parse(localStorage.getItem('listItems'));
    let deleted = taskLists.splice(index, 1);
    localStorage.setItem('listItems', JSON.stringify(taskLists));
    displayLists();
    

}

editText = (index) => {

    let edit = document.querySelectorAll('#edit');
    let del = document.querySelectorAll('#delete');

    
    let taskListDiv = document.querySelectorAll('.itemContainer')
    let buttonContainer = document.querySelectorAll('.buttonContainer')
    let inputEdit  = document.querySelectorAll('.editInput');

    inputEdit[index].style.display = 'flex';
    let p = document.querySelectorAll('.item');
    p[index].style.display = 'none';
    edit[index].style.display = 'none'
    del[index].style.display = 'none'


    let cancelButton = document.createElement('button')
    let saveButton = document.createElement('button')
    cancelButton.id = 'cancelButton';
    cancelButton.textContent = 'Cancel'
    saveButton.id = 'saveButton'
    saveButton.textContent = 'Save'
    taskListDiv[index].insertBefore(inputEdit[index], taskListDiv[index].firstChild)
    inputEdit[index].focus()
 
    buttonContainer[index].append(cancelButton, saveButton)
    buttonContainer[index].style.width = '130px'
    buttonContainer[index].style.marginRight = '5px'
    buttonContainer[index].style.gap = '5px'


    cancelButton.addEventListener('click',  function(){
       displayLists();
    })

    saveButton.addEventListener('click', function(){
        let listItems = JSON.parse(localStorage.getItem('listItems'));
        taskLists.splice(index, 1, inputEdit[index].value)
        console.log(inputEdit[index].value)
        localStorage.setItem('listItems', JSON.stringify(taskLists));
        displayLists();
    });
}

displayLists();






