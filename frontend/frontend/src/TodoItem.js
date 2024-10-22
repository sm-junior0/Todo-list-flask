import React from 'react';

const TodoItem = ({ todo, index, editTodo, deleteTodo }) => {
    return (
        <li>
            <div className="todo-content">
                <span className="task-number">{index + 1}.</span>
                <span className="task">{todo.task}</span>
                {todo.dueDate && <span className="due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>}
            </div>
            <div>
                <button onClick={() => editTodo(index)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTodo(index)} className="delete-btn">Delete</button>
            </div>
        </li>
    );
};

export default TodoItem;
