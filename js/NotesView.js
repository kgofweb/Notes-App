export default class NotesView {
  // root fait référence a la div note
  constructor(root, {
    onNoteSelect,
    onNoteAdd,
    onNoteEdit,
    onNoteDelete
  } = {}) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    // Afficher la vue
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add" type="button">Add Note...</button>
        <div class="notes__list"></div>
      </div>
    
      <div class="notes__preview">
        <input class="notes__title" type="text" placeholder="New Note">
        <textarea class="notes__body">Takes note...</textarea>
      </div>
    `;

    // Elements du DOM via le this.root.innerHTML
    const btnAddNote = this.root.querySelector('.notes__add');
    const inputTitle = this.root.querySelector('.notes__title');
    const inputBody = this.root.querySelector('.notes__body');

    // Event listner pour les actions à éffectuer
    btnAddNote.addEventListener('click', () => {
      // Appeler la function d'ajout de note
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach(inputField => {
      inputField.addEventListener('blur', () => {
        const updatedTitle = inputTitle.value.trim();
        const updatedBody = inputBody.value.trim();

        // Modification du titre et du contenu
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    // Masquer la note précédente par default
    // this.updateNotePreviewVisibility(false);
    
    // Creer un item dans la barre latérale
    // console.log(this._createListItemHTML(300, 'Hello World', 'Learn JavaScript', new Date()));
  }

  // Gestion d'un item dans la barre latérale
  _createListItemHTML(id, title, body, updated) {
    // La longueur maximale du texte avant les points de suspenssion...
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notes__list-item" data-note-id="${id}">
        <div class="notes__small-title">${title}</div>
        <div class="notes__small-body">
          ${body.substring(0, MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? '...' : ''}
        </div>
        <div class="notes__small-updated">
          ${updated.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
        </div>
      </div>
    `;
  }

  // Gestion de la mise à jour de la liste dans la barre latérale
  updatedNoteList(notes) {
    const notesListContainer = this.root.querySelector('.notes__list');

    // List vide
    notesListContainer.innerHTML = '';

    // Pour chaque notes
    for(const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      // Insérer le html avant la fin du container
      notesListContainer.insertAdjacentHTML('beforeend', html);
    }

    // Ajout des évenements Select/delete pour chaque item de la liste
    notesListContainer.querySelectorAll('.notes__list-item').forEach(noteListItem => {
      // Selectionner une note
      noteListItem.addEventListener('click', () => {
        this.onNoteSelect(noteListItem.dataset.noteId);
      });

      // Suprimer une note
      noteListItem.addEventListener('dblclick', () => {
        const doDelete = confirm('Are u sure to delete ?');

        if(doDelete) {
          this.onNoteDelete(noteListItem.dataset.noteId);
        }
      });
    });
  }

  // Affichage de la note courante
  updateActiveNote(note) {
    this.root.querySelector('.notes__title').value = note.title;
    this.root.querySelector('.notes__body').value = note.body;

    this.root.querySelectorAll('.notes__list-item').forEach(noteListItem => {
      noteListItem.classList.remove('notes__list-item--selected');
    });

    this.root.querySelector(`.notes__list-item[data-note-id='${note.id}']`).classList.add('notes__list-item--selected');
  }

  // Masquer la note précédente par defaut
  updateNotePreviewVisibility(visible) {
    this.root.querySelector('.notes__preview').style.visibility = visible ? 'visible' : 'hidden';
  }
}