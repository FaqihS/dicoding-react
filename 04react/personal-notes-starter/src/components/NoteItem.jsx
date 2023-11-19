import React from "react";
import NoteItemContent from "./NoteItemContent";
import NoteItemAction from "./NoteItemAction";


export default function NoteItem({note,onDelete,onArchive}){

  return(
  <div className="note-item">
      <NoteItemContent {...note}/>
      <NoteItemAction id={note.id} isArchived={note.archived} onDelete={onDelete} onArchive={onArchive}/>
    </div>
  )
}
