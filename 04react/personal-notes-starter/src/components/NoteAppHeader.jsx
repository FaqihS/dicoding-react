import React from "react";
import NoteSearch from "./NoteSearch";


export default function NoteAppHeader({searchNote,keyword}){
  return(
  <div className="note-app__header">
      <h1>Note App</h1>
      <NoteSearch searchNote={searchNote} keyword={keyword} />
    </div>
  )

}
