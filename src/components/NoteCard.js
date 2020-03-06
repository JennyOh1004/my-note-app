import React, { Component } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import "./NoteCard.css";

//child to List Component

class NoteCard extends Component {
  renderTags(note) {
    return note.tags.map((tag, index) => (
      <span className="note-card-tag" key={index}>
        {tag.name}
      </span>
    ));
  }

  render() {
    const { note, getNote, deleteNote } = this.props;

    return (
      <div className="note-card-container">
        <div className="note-card-title">{note.title}</div>
        <div className="note-card-content">{note.content}</div>
        <div className="note-card-tags">{this.renderTags(note)}</div>
        <span className="note-card-delete" onClick={() => deleteNote(note.id)}>
          <MdDelete />
        </span>

        <span
          className="note-card-edit"
          onClick={() => {
            getNote(note.id);
          }}
        >
          <MdModeEdit />
        </span>
      </div>
    );
  }
}

export default NoteCard;
