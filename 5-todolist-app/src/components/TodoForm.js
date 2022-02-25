import React , {useState} from 'react'

function TodoForm() {
    const [input ,setInput] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
    }
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
        <input value={input} type='text' name='text' placeholder='Enter todo' className='todo-input'></input>
        <button className='todo-btn'>Add Todo</button>
    </form>
  )
}

export default TodoForm