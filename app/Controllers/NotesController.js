import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { notesService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"



function _drawNotes() {
    let notes = appState.notes
    let template = ''
    notes.forEach(n => template += n.ListTemplate)
    setHTML('notes', template)
}

function _drawActiveNote() {
    // console.log('drawing active note', appState.activeNote);
    if (appState.activeNote) {
        let activeNote = appState.activeNote
        setHTML('current-note', activeNote.ActiveTemplate)
    }
    // else {
    //     setText('current-note', 'no-notes')
    // }

}

function _drawNotesCount() {
    let count = appState.notes.length
    // console.log(document.getElementById('notesCount'))
    setText('notesCount', count.toString())
}

export class NotesController {
    constructor() {
        // console.log('test controller')
        appState.on('notes', _drawNotes)
        appState.on('activeNote', _drawActiveNote)
        appState.on('notes', _drawNotesCount)
        _drawNotes()
        _drawNotesCount()
    }

    async deleteNote(noteId) {
        if (await Pop.confirm('do you want to delete this note?')) {
            notesService.deleteNote(noteId)
            _drawActiveNote()
        }
    }

    createNote() {
        // NOTE don't refresh the page
        window.event.preventDefault()
        let form = window.event.target
        let formData = getFormData(form)
        // console.log(formData);
        notesService.createNote(formData)
        form.reset()
    }

    setActiveNote(noteId) {

        notesService.setActiveNote(noteId)
        // let activeNote = appState.activeNote
        // setHTML('current-note', activeNote.name)
        // console.log('activeNote', activeNote.name);
    }

    saveNote() {
        // window.event.preventDefault()
        let newNote = document.querySelector('.note-save')

        notesService.saveNote(newNote.value)
        console.log(newNote, 'saving note');

    }


}

