let noteList = document.getElementById('notes');
let createNoteButton = document.getElementById('createNote');
let noteTitleInput = document.getElementById('noteTitle');
let noteContentInput = document.getElementById('noteContent');

// Fetch existing notes on page load
window.onload = function() {
    fetch('http://localhost:8081/api/notes')
        .then(response => response.json())
        .then(notes => {
            notes.forEach(note => {
                displayNote(note);
            });
        });
}

// Add a note to the DOM
function displayNote(note) {
    let noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.id = 'note-' + note.id;

    let titleElement = document.createElement('h2');
    titleElement.textContent = note.title;

    let contentElement = document.createElement('p');
    contentElement.textContent = note.content;

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);

    noteList.appendChild(noteElement);
    let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function () {
            deleteNote(note.id);
        }

        noteElement.appendChild(deleteButton);

        noteList.appendChild(noteElement);
}
function deleteNote(noteId) {
    fetch('http://localhost:8081/api/notes/' + noteId, {
        method: 'DELETE'
    }).then(() => {
        // Remove the note element from the page
        let noteElement = document.getElementById('note-' + noteId);
        noteList.removeChild(noteElement);
    });
}

// Handle create note button click
createNoteButton.onclick = function() {
    let title = noteTitleInput.value;
    let content = noteContentInput.value;

    if (!title || !content) {
        alert('Both title and content are required!');
        return;
    }

    let note = {
        title: title,
        content: content
    };




    // Send the note to the backend
    fetch('http://localhost:8081/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    .then(response => response.json())
    .then(newNote => {
        // Update the displayed note with the ID and other details from the backend
        note.id = newNote.id;
        displayNote(note);
        location.reload();
    });
    // Clear input fields for the next note
        noteTitleInput.value = '';
        noteContentInput.value = '';
}
