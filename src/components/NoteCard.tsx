import type { Note } from "../types";

type Props = {
  note: Note;
  onArchved: (id: Note["id"]) => void;
  onDelete: (id: Note["id"]) => void;
  onEdit: (note: Note) => void;
};

export default function NoteCard({ note, onArchved, onDelete, onEdit }: Props) {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "3px solid black",
        borderTop: "3px solid black",
        height: "150px",
        marginTop: "-24px",
      }}
    >
      <h3>{note.tittle}</h3>
      <p>Last Edited : {note.LastEdited}</p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginLeft: "20%",
        }}
      >
        <button className="nes-btn" onClick={() => onArchved(note.id)}>
          Archivar
        </button>
        <button
          className="nes-btn"
          style={{ marginLeft: "10px" }}
          onClick={() => onEdit(note)}
        >
          Editar
        </button>
        <button
          className="nes-btn"
          style={{ marginLeft: "10px" }}
          onClick={() => onDelete(note.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
