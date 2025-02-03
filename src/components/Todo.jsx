import { useState } from "react";
import "../App.css";
import { useEffect } from "react";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  let [uniqueId, setUniqueId] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input) {
      setTodos([...todos, { text: input, id: uniqueId }]);

      setInput("");
    }
    setUniqueId(uniqueId + 1);
  };
  const removeTodo = (id) => {
    setTodos((todo) => todo.filter((t) => t.id != id));
  };
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todo"));
    //parse converts json string into js value
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
    //stringify converts js value into json string
  }, [todos]);

  return (
    <>
      <div className="container">
        <form className="submit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <ul className="todos-list">
          {todos.map(({ text, id }) => (
            <li className="todo" key={id}>
              <span>{text}</span>
              <button className="close" onClick={() => removeTodo(id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
