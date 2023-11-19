import React from "react";

export default function NoteSearch({ searchNote, keyword }) {
  return (
    <div className="note-search">
      <input type="text" value={keyword} onChange={searchNote} placeholder="Cari Jurul Catatan.." />
    </div>
  );
}
