import { useState, useEffect } from "react";
import Alert from "../Alert/Alert";
import GroceryItem from "../GroceryItem/GroceryItem";

interface GroceryItemInterface {
  id: string;
  title: string;
}

const GroceryList = () => {
  const [groceryInput, setGroceryInput] = useState<string>("");
  const [groceryList, setGroceryList] = useState<GroceryItemInterface[]>(() => {
    let list = localStorage.getItem("groceryList");
    if(list){
      return JSON.parse(list)
    }
    else{
      return [];
    }
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    timeOut: 5000,
    type: "red",
  });

  const [mode, setMode] = useState("Add");
  const [editId, setEditId] = useState<string | null>(null);

  const showAlert = (show = false, type = "", message = "", timeOut = 2000) => {
    setAlert({ show, type, message, timeOut });
  };
  const handleSubmit = () => {
    if (!groceryInput) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (groceryInput && mode !== "Add") {
      setMode("Edit");

      setGroceryList((previousState) => {
        return previousState.map((item) => {
          if (item.id === editId) {
            return { ...item, title: groceryInput };
          }
          return item;
        });
      });
      setGroceryInput("");
      setEditId("");
      setMode("Add");
      showAlert(true, "success", "Grocery Item Updated");
    } else {
      setGroceryList((previousState) => {
        return [
          ...previousState,
          { id: new Date().getTime().toString(), title: groceryInput },
        ];
      });
      setGroceryInput("");

      showAlert(true, "success", "Grocery Item Added");
    }
  };

  const clearAllItems = () => {
    setGroceryList([]);
    showAlert(true, "danger", "All grocery items deleted");
  };

  const removeHandler = (id: string) => {
    showAlert(true, "danger", "Item deleted");
    setGroceryList((previousState) => {
      return previousState.filter((item) => item.id !== id);
    });
  };

  const editItem = (id: string) => {
    const specificItem = groceryList.find((item) => item.id === id);
    setMode("Edit");
    setEditId(id);
    if (specificItem) {
      setGroceryInput(specificItem?.title);
    }
  };

  const enterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <div style={{ width: "100%" }}>
      <h1>Grocery List</h1>
      <div>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={groceryList} />
        )}
        <div className="input-group">
          <input
            type="text"
            name="groceryInput"
            value={groceryInput}
            onChange={(e) => setGroceryInput(e.target.value)}
            placeholder="Example Eggs, Spinach"
            className="form-control"
            onKeyDown={enterPress}
          />
          <button onClick={handleSubmit} className="btn btn-outline-secondary">
            {mode}
          </button>
        </div>
      </div>
      {groceryList.length > 0 && (
        <ul className="list-group" style={{ marginTop: "5%" }}>
          {groceryList.map((groceryItem) => {
            return (
              <GroceryItem
                key={groceryItem.id}
                {...groceryItem}
                editHandler={editItem}
                removeHandler={removeHandler}
              />
            );
          })}
          <button
            onClick={clearAllItems}
            className="btn btn-danger "
            style={{ marginTop: "20px" }}
          >
            Clear Button
          </button>
        </ul>
      )}
    </div>
  );
};

export default GroceryList;
