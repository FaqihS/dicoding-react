import React from "react";
import { showFormattedDate } from "../utils";

export default function NoteItemContent({title,body,createdAt,archived}){
  const date= showFormattedDate(createdAt)

  return (
  <div className="note-item__content">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__date">{date}</p>
      <p className="note-item__body">{body}</p>
    </div>
  )

}
