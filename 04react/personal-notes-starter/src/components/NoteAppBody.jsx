import React from "react";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";

export default function NoteAppBody({notes,onDelete,onArchived,addNote}){
  const unArcivedNotes = notes.filter(note => !note.archived) 
  const arcivedNotes = notes.filter(note => note.archived) 

  return (
  <div className="note-app__body">
      <NoteInput addNote={addNote} />
      <h2>Catatan</h2>
      <NoteList notes={unArcivedNotes} onDelete={onDelete} onArchive={onArchived}/>
      <h2>Arsip</h2>
      <NoteList notes={arcivedNotes} onDelete={onDelete} onArchive={onArchived}/>
    </div>
  )

}
