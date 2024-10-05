import { useEffect, useState } from "react";
import { app } from "./firebaseConfig";
import { getDatabase, ref, set, get, push, remove } from "firebase/database";

// Access of database path
const db = getDatabase(app);

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [firebaseId, setFirebaseId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Add Data
  const addTodo = async () => {
    if (!text) {
      return alert("input field not to be empty");
    } else {
      const newTodoPath = push(ref(db, "todo"));

      set(newTodoPath, {
        id: Date.now(),
        todo: text,
      });

      setText("");
      getData();
    }
  };

  // Get Data
  const getData = async () => {
    const dbRef = ref(db, "todo");

    const data = await get(dbRef);

    // const a = data;
    // const b = data;
    // console.log("a", a.val());
    // console.log("b", Object.values(b.val()));

    if (data.exists()) {
      const myData = data.val();
      // console.log("myData: ", myData);
      // console.log("myData: ", Object.keys(myData));

      const newArray = Object.keys(myData).map((myFireId) => {
        // console.log(myFireId);
        return {
          ...myData[myFireId],
          id: myFireId,
        };
      });

      setList(newArray);
    } else {
      setList([]);
      console.log("No Data Found in Database");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // On Click Edit
  const handelOnClickEdit = async (id) => {
    const dbRef = ref(db, "todo/" + id);

    const data = await get(dbRef);

    if (data.exists()) {
      const updatedTodo = data.val();
      setText(updatedTodo.todo);

      setToggle(true);
      setDisabled(true);
      setFirebaseId(id);
    }
  };

  // Update Todo
  const updateTodo = async () => {
    const updatedTodoRef = ref(db, "todo/" + firebaseId);

    if (!text) {
      return alert("Input filed not to empty");
    } else {
      set(updatedTodoRef, {
        todo: text,
      });

      getData();
      setText("");
      setToggle(false);
      setDisabled(false);
      setFirebaseId(null);
    }
  };

  // Delete Data
  const deleteTodo = async (id) => {
    const dbRef = ref(db, "todo/" + id);
    await remove(dbRef);
    getData();
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        type="text"
        value={text}
        placeholder={toggle ? "Update Todo" : "Enter New Todo"}
        onChange={(e) => setText(e.target.value)}
      />

      {toggle ? (
        <button onClick={updateTodo}>Update Todo</button>
      ) : (
        <button onClick={addTodo}>Add New Todo</button>
      )}

      <ul>
        {list?.map((item, index) => (
          <li key={index}>
            {item.todo} || ID:{item.id}
            <span>
              <button
                disabled={disabled}
                onClick={() => handelOnClickEdit(item.id)}
              >
                Edit
              </button>
              <button disabled={disabled} onClick={() => deleteTodo(item.id)}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
