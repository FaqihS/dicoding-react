import React from "react";

export default function ArchiveButton({id,onArchive,isArchived}){
  const text = isArchived ? "Pindahkan" : "Arsip"
  return <button className="note-item__archive-button" onClick={()=>onArchive(id)}>{text}</button>
}
