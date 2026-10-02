import React from 'react';

const ToDo = props => {
    return(
        <div
            role="button" tabIndex={0} aria-pressed={props.toDo.completed}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); props.handleToggleComplete(props.toDo.id); } }}
            className={`toDo${props.toDo.completed ? ' completed': ''}`}
            style={props.toDo.completed ? { textDecoration: 'line-through' } : null}
            onClick={() => props.handleToggleComplete(props.toDo.id)}
        >
            <p>{props.toDo.task}</p>
        </div>
    )
};

export default ToDo;