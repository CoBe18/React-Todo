import React from 'react';

const ToDoForm = props => {
    return(
        <form onSubmit={props.handleAddToDo}>
            <input 
                onChange={props.handleToDoChange}
                aria-label="New task" type="text"
                name="toDo"
                value={props.value}
                placeholder="ToDo..."
            />
            <button type="submit">Add a ToDo</button>
            <button type="button" className="clear-btn" onClick={props.handleClearToDos}>Clear Completed Tasks</button>
        </form>
    )
};

export default ToDoForm;