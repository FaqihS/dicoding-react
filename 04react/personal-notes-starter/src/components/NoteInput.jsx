import React from "react";

export default class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
    this.max = 50

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTitleChange(e) {
    if (e.target.value.length > this.max) {
    } else {
      this.setState(() => {
        return {
          title: e.target.value,
        };
      });
    }
  }

  onBodyChange(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmit}>
          <p className="note-input__title__char-limit">
            Sisa Karakter: {this.max - this.state.title.length}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Isi judul"
            required
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <textarea
            className="note-input__body"
            type="text"
            placeholder="Tulis Catatanmu"
            required
            value={this.state.body}
            onChange={this.onBodyChange}
          />
          <button type="submit">Tambahkan Catatan</button>
        </form>
      </div>
    );
  }
}
