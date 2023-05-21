import { useMemo, useState } from "react";
import { Note } from "./types";
import api from "./api";
import NoteCard from "./components/NoteCard";

type NoteModalProps = {
  note: Partial<Note>;
  onClose: VoidFunction;
  onChange: (field: string, value: string) => void;
  onSave: VoidFunction;
};

function NoteModal({ note, onClose, onChange, onSave }: NoteModalProps) {
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "content",
      }}
      className="nes-dialog"
      id="dialog-default"
    >
      <div />
      <form
        method="dialog"
        style={{
          backgroundColor: "white",
          zIndex: 1,
          width: "500px",
          alignItems: "center",
          justifyContent: "content",
          textAlign: "center",
          padding: 20,
          border: "5px solid black",
        }}
      >
        <h1 className="title">Create/ Edit Note</h1>
        <div className="nes-field">
          <label
            htmlFor="title"
            style={{
              fontSize: 30,
            }}
          >
            Title
          </label>
          <input
            onChange={(event) => onChange("title", event.target.value)}
            value={note.tittle}
            type="text"
            id="title"
            className="nes-input"
            style={{
              border: "1px solid black",
              padding: 10,
              width: "90%",
              margin: "auto",
            }}
          />
        </div>
        <div className="nes-field">
          <label
            htmlFor="content"
            style={{
              fontSize: 30,
            }}
          >
            Content
          </label>
          <textarea
            style={{
              border: "1px solid black",
              padding: 10,
              width: "90%",
              margin: "auto",
            }}
            onChange={(event) => onChange("content", event.target.value)}
            value={note.content}
            className="nes-textarea"
            id="content"
          />
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            className="nes-btn"
            onClick={onClose}
            style={{
              border: "1px solid black",
              padding: 10,
              width: 100,
              borderRadius: 15,
              cursor: "pointer",
            }}
          >
            close
          </button>
          <button
            className="nes-btn is-primary"
            onClick={onSave}
            style={{
              border: "1px solid black",
              padding: 10,
              width: 100,
              borderRadius: 15,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

function App() {
  const [notes, setNotes] = useState<Note[]>(api.notes.List);
  const [draft, setDraft] = useState<null | Partial<Note>>(null);
  const [view, setView] = useState<"active" | "archived">("active");
  const matches = useMemo(() => {
    return notes.filter((note) => {
      if (view === "active") {
        return !note.archived;
      } else if (view === "archived") {
        return note.archived;
      }
    });
  }, [notes, view]);

  function hadleDelete(id: Note["id"]) {
    setNotes((notes) => notes.filter((note) => note.id != id));
  }
  function handleEdit(note: Note) {
    setDraft(note);
  }
  function handleArchived(id: Note["id"]) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id != id) return note;

        return {
          ...note,
          archived: !note.archived,
        };
      })
    );
  }

  function handleDrafchange(field: string, value: string) {
    setDraft((draft) => ({
      ...draft,
      [field]: value,
    }));
  }
  function handleSave() {
    if (draft?.id) {
      setNotes((notes) =>
        notes.map((note) => {
          if (note.id !== draft.id) return note;

          return {
            ...draft,
            lasEdited: new Date().toString(),
          } as Note;
        })
      );
    } else {
      setNotes((notes) =>
        notes.concat({
          id: String(+new Date()),
          ...(draft as Omit<Note, "id" | "lasEdited">),
        })
      );
    }
    setDraft(null);
  }

  return (
    <div
      style={{
        margin: " 200px auto",
        border: "4px solid black",
        width: "500px",
      }}
    >
      <main>
        <div style={{ textAlign: "center" }}>
          <h1>Mis Notas</h1>
        </div>
        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              marginLeft: "28%",
              marginBottom: 20,
            }}
          >
            <button
              className="nes-btn"
              style={{
                border: "1px solid black",
                padding: 10,
                width: 100,
                borderRadius: 15,
                cursor: "pointer",
              }}
              onClick={() => setDraft({})}
            >
              Crear nota
            </button>
            <button
              style={{
                border: "1px solid black",
                padding: 10,
                width: 100,
                borderRadius: 15,
                cursor: "pointer",
              }}
              className="nes-btn"
              onClick={() =>
                setView((view) => (view === "active" ? "archived" : "active"))
              }
            >
              {view === "active" ? "ver archivadas" : "Ver Activas"}
            </button>
          </div>
          {matches.map((note) => (
            <NoteCard
              onArchved={handleArchived}
              onDelete={hadleDelete}
              onEdit={handleEdit}
              key={note.id}
              note={note}
            />
          ))}
        </div>
        {draft && (
          <NoteModal
            onSave={handleSave}
            onChange={handleDrafchange}
            note={draft}
            onClose={() => setDraft(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
