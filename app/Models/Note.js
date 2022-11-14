import { generateId } from "../Utils/generateId.js";

export class Note {
    constructor(data) {
        this.id = generateId()
        this.notation = data.notation || 'no notation'
        this.name = data.name
        this.date = data.date ? new Date(data.date) : new Date()
        this.color = data.color
        this.saved = data.saved || this.ComputeDate
    }

    get ListTemplate() {
        return /*html*/`
        <li class="selectable" onclick="app.notesController.setActiveNote('${this.id}')">${this.name} ${this.ComputeDate}<i style="color:${this.color}"  class="mdi mdi-square" style=></i></li> 
        `

    }



    get ActiveTemplate() {
        return /*html*/`
        <div class="col-8 text-center"><h4>${this.name} <i style="color:${this.color}"class="mdi mdi-square"></i></h4></div>
    <div class="col-4">
    <button class="btn btn-danger" onclick="app.notesController.deleteNote('${this.id}')"><i class="mdi mdi-delete"></i></button>
      <button class="btn btn-info" onclick="app.notesController.saveNote()"><i class="mdi mdi-content-save"></i></button>
    </div>
    <textarea class="col-8 note-save" name="" id="" cols="50" rows="30">${this.notation}</textarea>
    <div class="col-6">Created: ${this.ComputeDate} <div>Updated:${this.saved}<div></div>
        `
    }




    //!SECTION uncomment when at this point
    get ComputeDate() {
        // NOTE sometimes to get exactly what you want you just gotta compute it
        let date = this.date
        return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear()
    }

    get ComputeFullDate() {
        // .toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
        return this.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
    }

    get ComputeTitle() {
        if (this.report) {
            return this.report.slice(0, 15) + '...'
        } else {
            return 'no report'
        }
    }

}