import { useState } from "react";


function App() {
  const [isForm, setIsForm] = useState(false);
  const [values, setValue] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [completedTask, setCompletedTask] = useState([]);

  function handleChange(e) {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
   if(values.description&&values.title){
    if (edit !== null) {
      const updatedValues = todos.map((v, index) =>
        edit === index ? values : v
      );
      setTodos(updatedValues);
      setEdit(null);
      
    } else {
      setTodos([...todos, values]);
    }
    setIsForm(false)
   }else{
    alert("Type anything")
    
   }
    setValue({
      title: "",
      description: "",
    });
   
  }

  function handleEdit(id) {
    setIsForm(true)
    setEdit(id);
    setValue(todos[id]);
  }

  function handleDelete(id) {
    setTodos(todos.filter((_, i) => i !== id));
  }

  function handleComplete(id) {
    const find = todos.findIndex((v, i) => i === id);
    const updatedTodo = { ...todos[find], isCompleted: true };
    setCompletedTask([...completedTask, updatedTodo]);
    
  }
  function handleClear() {
    setCompletedTask([]);
  }

  return (
    <div className="bg-slate-100 h-screen p-10">
      {isForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 rounded-lg  flex flex-col items-center justify-center gap-2 p-4 border w-[30vw] h-[40vh] mx-auto mb-4 shadow-lg "
        >
            <input
              type="text"
              name="title"
              placeholder="Enter the title..."
              className="border border-gray-300 rounded-md p-2"
              value={values.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter the description..."
              className="border  border-gray-300 rounded-md p-2"
              value={values.description}
              onChange={handleChange}
            />
       
          <div>
            <button
              type="submit"
              className="px-3 py-2 rounded-md shadow-lg border border-gray-500 hover:bg-slate-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      <div className="flex justify-around">
        <div className="w-[40%] border border-slate-500 rounded-lg p-4 ml-4">
          <div className="flex justify-between mb-4">
          <h1 className="text-4xl font-bold text-center mb-4">Todo Lists</h1>
          <button className="p-2 border shadow-lg rounded-lg" onClick={()=>setIsForm(true)}>New task</button>
          </div>
          {todos.map((v, id) => (
            <li className="list-none p-4 mb-4 border shadow-lg" key={id}>
              <h1 className="text-2xl font-bold">{v.title}</h1>
              <p className="text-slate-400 mb-4">{v.description}</p>
              <div>
                <button
                  className="border shadow-lg p-2 bg-slate-300 rounded"
                  onClick={() => handleEdit(id)}
                >
                  Edit
                </button>
                <button
                  className="border shadow-lg ml-2 p-2 bg-slate-300 rounded"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
               <button
                  className="border shadow-lg ml-2 p-2 bg-slate-300 rounded"
                  onClick={() => handleComplete(id)}
                >
                  Mark as Completed
                </button>
              </div>
            </li>
          ))}
        </div>
        {completedTask.length > 0 && (
          <div className="w-[40%] border border-slate-500 rounded-lg p-4 ml-4 ">
            <div>
              <div className="flex justify-between mb-4">
                <h1 className="text-4xl font-bold mb-4">Completed Taks</h1>
                <button className="p-2 border shadow-lg rounded-lg" onClick={handleClear}>
                  Clear
                </button>
              </div>
              {completedTask.map((value, index) => (
                <li className="list-none p-4 mb-4 border shadow-lg" key={index}>
                  <h1 className="text-2xl font-bold">{value.title}</h1>
                  <p className="text-slate-400">{value.description}</p>
                </li>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
