import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById('app');
const view = new NotesView(app, {
  // Lorsqu'on effectue un click au niveau de la sidebar
  onNoteAdd() {
    console.log('Let\'s add new note !');
  }, 
  onNoteEdit(newNoteTitle, newNoteBody) {
    console.log(newNoteTitle);
    console.log(newNoteBody);
  }
});

// Afficher les notes de la barre latérale
view.updatedNoteList(NotesAPI.getAllNotes());