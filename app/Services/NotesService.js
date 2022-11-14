import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

class NotesService {

    createNote(noteData) {
        let newNote = new Note(noteData)
        appState.notes = [...appState.notes, newNote]
        saveState('notes', appState.notes)
        // console.log('creating note', appState.notes);
    }

    setActiveNote(noteId) {
        const foundNote = appState.notes.find(n => n.id == noteId)
        // console.log('found note', foundNote);
        appState.activeNote = foundNote
        // console.log('setting note', appState.activeNote);
        // saveState('activeNote', appState.activeNote)
    }

    saveNote(newNote) {
        appState.activeNote.saved = new Date().toLocaleString()
        let activeNote = appState.activeNote
        activeNote.notation = newNote
        appState.emit('activeNote')
        saveState('notes', appState.notes)
    }

    deleteNote(noteId) {
        let filteredArray = appState.notes.filter(n => n.id != noteId)
        appState.notes = filteredArray
        saveState('notes', appState.notes)
        // appState.activeNote = null
        appState.activeNote = appState.activeNote
    }

    // addNote() {
    //     appState.notes = appState.notes + 1
    // }
}





export const notesService = new NotesService








