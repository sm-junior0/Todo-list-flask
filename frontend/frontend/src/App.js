import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoItem from './TodoItem';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addOrUpdateTodo = async () => {
        if (!newTodo) return;
        try {
            if (editIndex !== null) {
                const updatedTodo = { task: newTodo, dueDate: newDueDate };
                await axios.put(`http://localhost:5000/todos/${editIndex}`, updatedTodo);
                setEditIndex(null);
            } else {
                const newTodoItem = { task: newTodo, dueDate: newDueDate };
                await axios.post('http://localhost:5000/todos', newTodoItem);
            }
            setNewTodo('');
            setNewDueDate('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding/updating todo:', error);
        }
    };

    const editTodo = (index) => {
        setEditIndex(index);
        setNewTodo(todos[index].task);
        setNewDueDate(todos[index].dueDate);
    };

    const deleteTodo = async (index) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${index}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <div className="form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New task..."
                />
                <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                />
                <button onClick={addOrUpdateTodo}>
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        index={index}
                        todo={todo}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            <footer>
                Made with ❤️ by Manene Junior
            </footer>
        </div>
    );
};

export default App;
