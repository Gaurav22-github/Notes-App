import { useState, useRef } from 'react'; // hook to create useState and useRef
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  //state can only modify by own modifier (setTask)
  const [tasks, setTask] = useState([]);
  console.log(tasks);

  const inpRef = useRef();

  const addTaskHandler = () => {
    const data = inpRef.current.value.trim();
    if (data === '') return;
    inpRef.current.value = '';

    console.log(data);

    // Use spread to transfer data to tasks
   
    setTask([...tasks, data]);
  };
// key up event  in input ref
  const KeyUpEvent = (event) => {
    if (event.key === 'Enter') {
      addTaskHandler();
    }
  };

  

  const removeItemHandler = (index) => {
    console.log(index);
    const currentTasks = [...tasks];
    currentTasks.splice(index, 1);

    console.log(tasks);
    setTask(currentTasks);

    console.log(currentTasks);
  };

  return (
    <>
      <div className="container my-2 mx-auto">
        <div className="d-flex gap-3">
          <input ref={inpRef}  type="text" onKeyUp={KeyUpEvent} placeholder="Enter your Task" className="form-control" />
          <button onClick={addTaskHandler} className="btn btn-primary">Add</button>
        </div>
         <div className="row gap-2">
         {
            // Using ternary operator
            tasks.length === 0
              ? <h6 className="text-center my-3">Enter Your Task here ⬆️</h6>
              : tasks.map((task, index) => (
                  <Item index={index} removeHandler={removeItemHandler} key={index} data={task} />
                ))
          }
         </div>
      </div>
    </>
  );
}

const Item = (props) => {
  return (
    <div className="todobox">
      <div className="menu">
      <span className='taskno'> Task {props.index + 1}</span>
        <span id="deletebtn" onClick={() => props.removeHandler(props.index)}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
      <textarea id="todoinput" value={props.data} readOnly></textarea>
    </div>
  );
};

export default App;
