import React, { useState } from 'react'

function ToDoList(){

    const [tasks, setTask] = useState(["Task 1", "Task 2", "Task 3"]);
    const [newTask, setNewTask] = useState("");

    const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
    const [editText, setEditText] = useState(""); // Track the new text while editing


    function handleInputChange() {
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTask(t => [newTask, ...t]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_,i) => i !== index);
        setTask(updatedTasks);
    }

    function moveTaskUp(index) {
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index-1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length -1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = 
            [updatedTasks[index+1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    function markAsDone(index) {
        const updatedTasks = [...tasks];
        let taskToMark = updatedTasks[index];

        if (!taskToMark.includes('class="done"')) taskToMark = `<span id="task-${index}" class="done">${taskToMark}</span>`;

        updatedTasks.splice(index, 1);
        updatedTasks.push(taskToMark);


        setTask(updatedTasks);
    }

    function editTask(index) {
        const task = tasks[index];

        // Check if the task string contains the 'done' class
        if (!task.includes('class="done"')){
            setEditIndex(index); 
            setEditText(tasks[index]); 
        }
    }

    function handleEditChange(event) {
        setEditText(event.target.value); // Update the state as the user types
    }
    
    function saveTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editText; // Update the task with the new text
    
        setTask(updatedTasks); // Update the task list state
        setEditIndex(null); // Reset the edit mode
        setEditText(""); // Clear the edit text state
    }
    
    
    return(
    <div className='to-do-list'>
        <h1>To-Do List</h1>

        <div>
            <input
                type='text'
                placeholder='Enter task here'
                value={newTask}
                onChange={handleInputChange}
                />
            <button
                className='add-button'
                onClick={addTask}>
                add
            </button>

        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>

                    {editIndex === index ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={handleEditChange}
                            onBlur={() => saveTask(index)} // Save on blur
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    saveTask(index); // Save on Enter key press
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                        <span className='text' dangerouslySetInnerHTML={{ __html: task }} />
                    )}

                    <button
                        className='edit-button'
                        onClick={() => editTask(index)}
                    >
                        ✒️
                    </button>

                    <button
                        className='move-button'
                        onClick={() => moveTaskUp(index)}
                    >
                        🔼
                    </button>

                    <button
                        className='move-button'
                        onClick={() => moveTaskDown(index)}
                    >
                        🔽
                    </button>

                    <button
                        className='delete-button'
                        onClick={() => deleteTask(index)}
                    >
                        🗑️
                        {/* ❌🚮❎ */}
                        
                    </button>

                    <button
                        className='markAsDone-button'
                        onClick={() => markAsDone(index)}
                    >
                        ✅
                        {/* ✔️ */}
                    </button>
                </li>
            )}
        </ol>

    </div>
    )
}


export default ToDoList