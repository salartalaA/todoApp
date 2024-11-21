import "./App.css";
import Logo from "./assets/Logo.png";
import plugIcon from "./assets/Layer 2.png";
import cliIcon from "./assets/Clipboard.png";
import { useEffect, useState } from "react";
import TodoItem from "./components/todoItem.component";
function App() {
  const [todoText, setTodoText] = useState();
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? []
  );

  useEffect(() => {
    const localtodos = localStorage.getItem("todos");
    if (localtodos) setTodos(JSON.parse(localtodos));
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChangeAddTodo = (e) => {
    setTodoText(e.target.value);
  };
  const handleSubmitButton = () => {
    const formData = todos;
    formData.push({
      text: todoText,
      isCompleted: false,
      id: Math.random(),
    });
    setTodos([...formData]);
  };
  const handleCompleteTask = (id) => {
    const completeTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setTodos(completeTodo);
  };

  const handleDelete = (id) => {
    const deltedTodo = todos?.filter((todo) => todo.id !== id);
    setTodos(deltedTodo);
  };
  const doneTodos = todos?.filter((todo) => todo.isCompleted);
  return (
    <div className="bg-primary h-screen">
      <div className="bg-secondary h-[200px] flex justify-center items-center">
        <img src={Logo} alt="logo" />
      </div>

      <div className=" flex  w-full justify-center items-center relative">
        <div className="flex gap-[8px] h-[54px] w-full px-6 md:px-0 md:w-[736px]  absolute top-50% ">
          <input
            className="border-none rounded-md  w-full text-base outline-none bg-[#262626] p-4"
            placeholder="Add a new task"
            onChange={handleChangeAddTodo}
          />
          <button
            className=" flex items-center p-4 rounded-md gap-2 text-[#fff] bg-[#1E6F9F]"
            onClick={handleSubmitButton}
          >
            create
            <img src={plugIcon} alt="plugIcon" />
          </button>
        </div>
      </div>

      <div className="mt-[91px] w-full flex justify-center">
        <div className="w-[736px] flex flex-col gap-6 mx-6">
          <div className="flex justify-between ">
            <div className="text-[#4EA8DE] flex gap-2 ">
              Created Tasks
              <div className="py-[2px]  px-[8px] rounded-full text-xs flex items-center bg-[#333333] text-[white]">
                {todos?.length}
              </div>
            </div>
            <div className="text-[#4EA8DE] flex gap-2 ">
              Completed
              <div className="py-[2px]  px-[8px] rounded-full text-xs flex items-center bg-[#333333] text-[white]">
                {doneTodos?.length}
              </div>
            </div>
          </div>
          {todos?.length ? (
            todos.map((todo, index) => (
              <TodoItem
                text={todo.text}
                isCompleted={todo.isCompleted}
                id={todo.id}
                handleDelete={handleDelete}
                handleCompleteTask={handleCompleteTask}
              />
            ))
          ) : (
            <div className="flex gap-4  py-12  flex-col items-center border-t-[1px] border-[#333333] rounded-lg">
              <img src={cliIcon} alt="cliIcon" className="size-14" />
              <div className="flex flex-col text-center text-[#808080]">
                <span className="font-bold">
                  You don't have tasks registered yet
                </span>
                <span>Create tasks and organize your to-do items</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
