import NotesView from "./NotesView.js";
import NoteAPI from './NotesAPI.js';
import NotesAPI from "./NotesAPI.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    // Mise à jour de la note
    this._refreshNotes();
  }

  // Affichage de la nouvelle note dans la barre latérale (Mise à jour);
  _refreshNotes() {
    // Affichage des notes
    const notes = NoteAPI.getAllNotes();

    this._setNotes(notes);

    if(notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  // Gestion de la note sélectionné
  _setNotes(notes) {
    this.notes = notes;
    this.view.updatedNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  // Gestion de la note en cour de lecture
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  // Gestion des differents évenements
  _handlers() {
    return {
      onNoteSelect: noteId => {
        const selectNote = this.notes.find(note => note.id == noteId);
        this._setActiveNote(selectNote);
      },
      onNoteAdd: () => {
        const newNote = {
          title: '',
          body: ''
        }

        // Ajouter une note
        NotesAPI.saveNote(newNote);
        // L'afficher dans la sidebar
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title,
          body
        });

        this._refreshNotes();
      },
      onNoteDelete: noteId => {
        NoteAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    }
  }
}