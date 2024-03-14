import { useEffect, useRef, useState } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("to-dos")) || []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const titleEditRef = useRef(null); // Ref for title input
  const descriptionEditRef = useRef(null); // Ref for description input

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(todo.map(({ editMode, ...rest }) => rest)));
  }, [todo]);

  useEffect(() => {
    if (editIndex !== null && titleEditRef.current) {
      titleEditRef.current.focus(); // Focus on title input
    }
  }, [editIndex]);


  const toDos = todo.map((todo, index) => {

    let todoItemClassNames = 'todo-item';

    if (todo.editMode) {
      todoItemClassNames += ' editMode';
    }

    if (todo.isCompleted) {
      todoItemClassNames += ' isCompleted';
    }

    return (
      <li className={todoItemClassNames} key={index}>
        <div className="index" onClick={() => handleComplete(index)}>
          {
            todo.isCompleted ? 
            <FaCircleXmark /> : 
            <FaCheckCircle />
          }
        </div>
        <div className="todo-listItem">
          {
            todo.editMode ?
              <>
                <form className="todoEditForm" onSubmit={(e) => editSubmitHandler(e, index)}>
                  <div className="todo">
                    <div className="title">
                      <input ref={titleEditRef} name='titleEdit' defaultValue={todo.title} className='titleEdit' type="text" required={true} />
                    </div>
                    <div className="description">
                      <input ref={descriptionEditRef} name='descriptionEdit' defaultValue={todo.description} className='descriptionEdit' type="text" required={true} />
                    </div>
                  </div>
                  <div className="todo-button">
                    <button type='submit' className='submit'><FaSave /></button>
                    <button className='delete' onClick={(e) => deleteHandler(e, index)}><MdDelete /></button>
                  </div>
                </form>
              </> :
              <>
                <div className="todo">
                  <div className="title">
                    {todo.title}
                  </div>
                  <div className="description">
                    {todo.description}
                  </div>
                </div>
                <div className="todo-button">
                  <button className='edit' onClick={() => editHandler(index)}><FaEdit /></button>
                  <button className='delete' onClick={(e) => deleteHandler(e, index)}><MdDelete /></button>
                </div>
              </>
          }
        </div>
      </li>
    )
  })
  const noToDos =
    <div className="noTodos">
      No To-Dos, Use input field above to add new To-Do
    </div>

  const submitHandler = (e) => {
    e.preventDefault();
    setTodo((prevTodo) => {
      return (
        [...prevTodo, {
          title: title,
          description: description,
          editMode: false
        }]
      )
    });
    setTitle('');
    setDescription('');
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const deleteHandler = (e, index) => {
    e.preventDefault();
    setTodo((prevTodo) => {
      const newTodo = [...prevTodo];
      newTodo.splice(index, 1);
      return (newTodo);
    });
  }

  const editHandler = (index) => {
    const todoItem = todo[index];
    if (todoItem.isCompleted) {
      return;
    }
    setEditIndex(index);
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return { ...todo, editMode: true }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
  }

  const editSubmitHandler = (e, index) => {
    e.preventDefault();
    setEditIndex(null);
    const formData = new FormData(e.target);
    const titleEdit = formData.get('titleEdit');
    const descriptionEdit = formData.get('descriptionEdit');
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return {
            ...todo,
            title: titleEdit,
            description: descriptionEdit,
            editMode: false
          }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
  }

  const handleComplete = (index) => {
    const todoItem = todo[index];
    if (todoItem.editMode) {
      return;
    }
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
  }

  return (
    <>
      <div className="page">
        <div className="to-do">
          <form className="todo-input" onSubmit={(e) => submitHandler(e)}>
            <div className="input-field">
              <div className="title input-section">
                <input type="text" className="titleInput" value={title} onChange={(e) => handleTitle(e)} required={true} />
                <span>Title</span>
                <i></i>
              </div>
              <div className="description input-section">
                <input type="text" className="descInput" value={description} onChange={(e) => handleDescription(e)} required={true} />
                <span>Description</span>
                <i></i>
              </div>
            </div>
            <div className="button">
              <button type='submit'>
                <FaPlusCircle size={25} />
              </button>
            </div>
          </form>
          <div className="line"></div>
          <div className="todos">
            <div className="todos-text">
              My todos
            </div>
            {toDos.length !== 0 ?
              <ul>
                {toDos}
              </ul> :
              noToDos}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
