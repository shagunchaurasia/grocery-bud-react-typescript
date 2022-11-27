import { FaEdit, FaTrash } from "react-icons/fa";
interface GroceryItemInterface {
  id: string;
  title: string;
  editHandler: (id: string) => void;
  removeHandler: (id: string) => void;
}
const GroceryItem = (props: GroceryItemInterface) => {
  return (
    <li
      className="list-group-item"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <span style={{ flex: 4 }}>{props.title}</span>
      <div style={{ flex: 1, flexWrap: "wrap", wordBreak: "break-word" }}>
        <button
          type="button"
          className="btn btn-dark me-md-2"
          onClick={() => props.editHandler(props.id)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.removeHandler(props.id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default GroceryItem;
