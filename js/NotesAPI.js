export default class NotesAPI {
  // Recupérer toutes les notes
  static getAllNotes() {
    // Récupérer la clé de la note pour le store
    const notes = JSON.parse(localStorage.getItem('notesApp-notes') || '[]');

    // Oraganiser les notes selon la date et l'heure d'ajout
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  // Sauvegarder une note
  static saveNote(noteToSave) {
    // Faire reference a une note existante
    const notes = NotesAPI.getAllNotes();

    // Vérifier si une note existe déjà
    const existing = notes.find(note => note.id == noteToSave.id);

    // Editer/Mettre à jour
    if(existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      // Generer un id aléatoire pour la sauvegarde
      noteToSave.id = Math.floor(Math.random() * 10000);

      noteToSave.updated = new Date().toISOString();

      // Ajouter une nouvelle note à la fin du tableau [notes]
      notes.push(noteToSave);
    }

    // Sauvegarder dans le store grace à setItem
    localStorage.setItem('notesApp-notes', JSON.stringify(notes));
  }

  // Supprimer une note via son id
  static deleteNote(id) {
    // Commencer par récupérer ttes les notes
    const notes = NotesAPI.getAllNotes();

    // Les notes restantes
    const newNotes = notes.filter(note => note.id != id);

    // Enregistrer le nouveau tableau dans le store
    localStorage.setItem('notesApp-notes', JSON.stringify(newNotes));
  }
}