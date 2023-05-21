import type { Note } from "../types";

type Props = {
  note: Note;
  onArchved: (id: Note["id"]) => void;
  onDelete: (id: Note["id"]) => void;
  onEdit: (note: Note) => void;
};

export default function NoteCard({ note, onArchved, onDelete, onEdit }: Props) {
  return (
    <div className="nes-container " style={{ width: "500px" }}>
      <h3>{note.tittle}</h3>
      <p>Last Edited : {note.LastEdited}</p>
      <div style={{ display: "flex", gap: "12px" }}>
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
