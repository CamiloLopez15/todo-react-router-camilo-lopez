import { useState, useRef } from 'react'
import './Camilo-Lopez.css'

const TodoItem = ({ todo, editId, editText, setEditText, saveEdit, cancelEdit, toggle, startEdit, remove }) => (
    <li key={todo.id} className={`todo-item${todo.completed ? ' done' : ''}`}>
        {editId === todo.id ? (
            <input
                className="todo-edit-input"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                autoFocus
            />
        ) : (
            <span className="todo-text">{todo.text}</span>
        )}

        <div className="todo-actions">
            {editId === todo.id ? (
                <>
                    <button className="todo-action save"   onClick={() => saveEdit(todo.id)}>Guardar</button>
                    <button className="todo-action cancel" onClick={cancelEdit}>Cancelar</button>
                </>
            ) : (
                <>
                    <button className="todo-action complete" onClick={() => toggle(todo.id)}>
                        {todo.completed ? 'Deshacer' : 'Completar'}
                    </button>
                    <button className="todo-action edit"   onClick={() => startEdit(todo)}>Editar</button>
                    <button className="todo-action delete" onClick={() => remove(todo.id)}>Eliminar</button>
                </>
            )}
        </div>
    </li>
)

const Todo = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Aprender React Router', completed: true  },
        { id: 2, text: 'Crear un CRUD con estado local', completed: false },
    ])
    const [input,    setInput]    = useState('')
    const [editId,   setEditId]   = useState(null)
    const [editText, setEditText] = useState('')
    const inputRef = useRef(null)

    const pending   = todos.filter(t => !t.completed)
    const completed = todos.filter(t =>  t.completed)

    const add = (e) => {
        e.preventDefault()
        const text = input.trim()
        if (!text) return
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }])
        setInput('')
        inputRef.current?.focus()
    }

    const toggle = (id) =>
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

    const remove = (id) =>
        setTodos(prev => prev.filter(t => t.id !== id))

    const startEdit = (todo) => { setEditId(todo.id); setEditText(todo.text) }

    const saveEdit = (id) => {
        const text = editText.trim()
        if (!text) return
        setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))
        setEditId(null)
    }

    const cancelEdit = () => setEditId(null)

    const itemProps = { editId, editText, setEditText, saveEdit, cancelEdit, toggle, startEdit, remove }

    return (
        <div className="todo-page">
            <h1 className="todo-title">Tareas</h1>

            <form className="todo-form" onSubmit={add}>
                <input
                    ref={inputRef}
                    className="todo-input"
                    type="text"
                    placeholder="Nueva tarea..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    maxLength={120}
                />
                <button className="todo-add-btn" type="submit">Agregar</button>
            </form>

            <section>
                <h2 className="todo-section-title">Pendientes</h2>
                {pending.length === 0
                    ? <p className="todo-empty">No hay tareas pendientes.</p>
                    : <ul className="todo-list">{pending.map(todo => <TodoItem key={todo.id} todo={todo} {...itemProps} />)}</ul>
                }
            </section>

            {completed.length > 0 && (
                <section>
                    <h2 className="todo-section-title">Completadas</h2>
                    <ul className="todo-list">{completed.map(todo => <TodoItem key={todo.id} todo={todo} {...itemProps} />)}</ul>
                </section>
            )}
        </div>
    )
}

export default Todo
