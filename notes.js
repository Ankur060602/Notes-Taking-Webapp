const addbtn = document.querySelector("#addbtn")
const main = document.querySelector("#main")

//----------save notes function--------

const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes)
    const data = []
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    console.log(data)

    if(data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

// ----------add note------------

addbtn.addEventListener(
    "click",
    function() {
        addnote()
    }
)

const addnote = (text ="") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-regular fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
`;

// -------delete note------------

note.querySelector(".trash").addEventListener(
    "click",
    function() {
        note.remove()
        savenotes()
    }
)

// ----------save note-----------

note.querySelector(".save").addEventListener(
    "click",
    function() {
        savenotes()
    }
    
)

// -----------appending child--------
note.querySelector("textarea").addEventListener(
    "focusout",
    function(){
        savenotes()
    }
)
main.appendChild(note);
savenotes()
}


// -------------Self calling function----------

(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null){
            addnote()
        }
        else{
            lsnotes.forEach(
                (lsnotes) => {
                    addnote(lsnotes)
                }
            )

        }        
    }
)()

