import React from "react";
import { getInitialData } from "../utils";
import NoteAppBody from "./NoteAppBody";
import NoteAppHeader from "./NoteAppHeader";

export default class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      keyword: "",
    };

    this.onDelete = this.onDelete.bind(this);
    this.onArchive = this.onArchive.bind(this);
    this.addNote = this.addNote.bind(this);
    this.searchNote = this.searchNote.bind(this);
  }

  onDelete(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchive(id) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    this.setState({ notes });
  }

  addNote({ title, body }) {
    const date = new Date();
    const newNote = {
      id: +date,
      title,
      body,
      createdAt: date.toISOString(),
      archived: false,
    };

    this.setState((prev) => {
      return {
        notes: [...prev.notes, newNote],
      };
    });
  }

  searchNote(e) {
    const keyword = e.target.value;
    this.setState({ keyword });
  }

  filterdNotes() {
    const filtered = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );
    return filtered;
  }

  render() {
    return (
      <>
        <NoteAppHeader
          searchNote={this.searchNote}
          keyword={this.state.keyword}
        />
        <NoteAppBody
          notes={this.filterdNotes()}
          onDelete={this.onDelete}
          onArchived={this.onArchive}
          addNote={this.addNote}
        />
      </>
    );
  }
}
