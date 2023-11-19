import React from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

export default function NoteItemAction ({id,isArchived,onDelete,onArchive}){

  return(
  <div className="note-item__action">
      <DeleteButton id={id} onDelete={onDelete} />
      <ArchiveButton id={id} onArchive={onArchive} isArchived={isArchived} />
    </div>
  )

}
