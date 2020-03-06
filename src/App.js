import React, { Component } from "react";
import Nav from "./components/Nav";
import List from "./components/List";
import Note from "./components/Note";
import axios from "axios";
import urlFor from "./helpers/urlFor";
import Flash from "./components/Flash";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNote: false,
      notes: [],
      note: {},
      newTag: false,
      error: ""
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: !this.state.showNote,
      note: {}
    });
  };

  getNotes = () => {
    axios
      .get(urlFor("notes"))
      .then(res =>
        this.setState({
          notes: res.data
        })
      )
      .catch(err => console.log(err.response.data));
  };

  getNote = id => {
    axios
      .get(urlFor(`notes/${id}`))
      .then(res =>
        this.setState({
          note: res.data,
          showNote: true
        })
      )
      .catch(err => console.log(err.response.data));
  };

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor("notes"), data);
    }
  };

  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
      .then(res =>
        this.setState({
          showNote: false //the page will transition back to the listing page
        })
      )
      .catch(err => {
        const { errors } = err.response.data;
        if (errors.content) {
          this.setState({
            error: "Missing Note Content!"
          });
        } else if (errors.title) {
          this.setState({
            error: "Missing Note Title!"
          });
        }
      });
  };

  deleteNote = id => {
    const { notes } = this.state;
    const newNotesState = notes.filter(note => note.id !== id);
    axios
      .delete(urlFor(`notes/${id}`))
      .then(res =>
        this.setState({
          notes: newNotesState
        })
      )
      .catch(err => console.log(err.response.data));
  };

  showTagForm = () => {
    this.setState({
      newTag: true
    });
  };

  closeTagForm = () => {
    this.setState({
      newTag: false
    });
  };

  submitTag = (data, noteId) => {
    axios
      .post(urlFor(`notes/${noteId}/tags`), data)
      .then(res => this.getNote(noteId))
      .catch(err => {
        const { errors } = err.response.data;
        if (errors.name) {
          this.setState({
            error: "Missing Tag Name!"
          });
        }
      });
  };

  deleteTag = (noteId, id) => {
    axios
      .delete(urlFor(`/tags/${id}`))
      .then(res => this.getNote(noteId))
      .catch(err => console.log(err.response.data));
  };

  resetError = () => {
    this.setState({
      error: ""
    });
  };

  render() {
    const { showNote, notes, note, newTag, error } = this.state; //state 가져오기
    const {
      toggleNote,
      getNotes,
      getNote,
      submitNote,
      deleteNote,
      showTagForm,
      closeTagForm,
      submitTag,
      deleteTag
    } = this; //function 가져오기

    return (
      <div className="App">
        <Nav toggleNote={toggleNote} showNote={showNote} />
        {/* Nav component 에서 불러서 쓸수있게 연결해주는 역할 */}
        {/* Nav 안에 toggleNote method, showNote state를 props로 넣어주기  */}
        {error && <Flash error={error} resetError={this.resetError} />}
        {showNote ? (
          <Note
            note={note}
            submitNote={submitNote}
            newTag={newTag}
            showTagForm={showTagForm}
            closeTagForm={closeTagForm}
            submitTag={submitTag}
            deleteTag={deleteTag}
          />
        ) : (
          <List
            getNotes={getNotes}
            notes={notes}
            getNote={getNote}
            deleteNote={deleteNote}
          />
        )}
      </div>
    );
  }
}

export default App;
