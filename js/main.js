// import NotesAPI from './NotesAPI.js';
// import NotesView from './NotesView.js';
import App from './App.js';

// Récupérer la div note
// const app = document.getElementById('app');
const root = document.getElementById('app');
const app = new App(root);

// Creer un nouvel affichage
// const view = new NotesView(app, {
//   // Lorsqu'on click pour ajouter
//   onNoteAdd() {
//     console.log('Let\'s add new note !');
//   },
//   onNoteSelect(id) {
//     console.log('Note Selected:' + id);
//   },
//   onNoteDelete(id) {
//     console.log(`Note Deleted ${id}`);
//     // console.log('Note deleted' + id);
//   },
//   onNoteEdit(newNoteTitle, newNoteBody) {
//     console.log(newNoteTitle);
//     console.log(newNoteBody);
//   }
// });

// const notes = NotesAPI.getAllNotes();

// // Afficher les notes de la barre latérale
// view.updatedNoteList(notes);
// // Afficher la note sélectionnée
// view.updateActiveNote(notes[0]);