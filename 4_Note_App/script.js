const noteContainerParent = document.getElementById("note-container-parent");
const noteContainer = noteContainerParent.querySelector(".note-container");
const editBtn = document.getElementById("edit-btn");
const addNoteBtn = document.getElementById("add-note");
// const viewContainer = noteContainer.querySelector(".view-container");

addNoteBtn.addEventListener("click", () => {
  addNote();
});
function addNote() {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.innerHTML = `
    
        <div class="tools">
          <button id="edit-btn" title="Edit" class="fas fa-edit"></button>
          <button id="delete-btn" title="Delete" class="fas fa-trash"></button>
        </div>
        <textarea class="hidden" name="" id="text" cols="30" rows="14"></textarea>
      
    `;
  const editBtn = noteContainer.querySelector("button#edit-btn");
  const deletBtn = noteContainer.querySelector("button#delete-btn");
  const textArea = noteContainer.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    // viewContainer.classList.toggle('view-container-hidden');
    textArea.classList.toggle("view");
    if (textArea.hasAttribute("readonly")) {
      textArea.removeAttribute("readonly", "");
      textArea.style.cursor = "default";
      textArea.style.color = "black";
      textArea.style.overflowY = "auto";
    } else {
      textArea.setAttribute("readonly", "");
      textArea.style.cursor = "not-allowed";
      textArea.style.color = "white";
      textArea.style.overflowY = "hidden";
    }
  });

  deletBtn.addEventListener("click", () => {
    var result = confirm('Want to Delete?');

    if(result){
      noteContainer.remove();
    }
  });

  textArea.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log({ value });
  updateLS();

  // const notes = [];

  // textArea.foreach(note => { // note is textarea
  //     notes.push(note.value);
  // });


  // viewContainer.innerText= mark(value);
});



  noteContainerParent.appendChild(noteContainer);
}
function updateLS(){
  const text = noteContainer.querySelector("#text");
  const notes = [];

  text.foreach(note => { // note is textarea
      notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));


}


