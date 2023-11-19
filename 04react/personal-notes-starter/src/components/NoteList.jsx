import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({notes,onDelete,onArchive}){

  if(notes.length ===0){
    return <p className="notes-list__empty-message">Tiada ada Catatan</p>
  }

  return(
  <div className="notes-list">
      {
        notes.map(note=>(
        <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive}/>
        ))
      }
    </div>
  )

}
