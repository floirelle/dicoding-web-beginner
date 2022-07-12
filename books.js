const completed_id = "completeBookshelfList"
const incompleted_id = "incompleteBookshelfList"
let books = []
function addBooks(title, author, year, isComplete){

    let id = new Date().getTime();
    let book = {
        id:id,
        title: title,
        author: author,
        year:year,
        isComplete:isComplete
    }
    books.push(book)
    if(isComplete){
        document.getElementById(completed_id).append(makeBook(book))
    }else{
        document.getElementById(incompleted_id).append(makeBook(book))
    }
    updateStorageData()
}

function makeBook(book){
               
    let title = book.title;
    let year = book.year;
    let author = book.author;
    let isComplete = book.isComplete;
    var article = document.createElement("article")
    article.classList.add("book_item")

    var titleBody = document.createElement("h3")
    titleBody.innerHTML = title;

    var authorBody = document.createElement("p")
    authorBody.innerHTML = "Penulis: "+author

    var yearBody = document.createElement("p")
    yearBody.innerHTML = "Tahun: "+year

    var actionContainer = document.createElement("div")
    actionContainer.classList.add("action")

    var moveBookBtn = document.createElement("button")
    moveBookBtn.classList.add("green")
    if(isComplete){
        moveBookBtn.innerHTML = "Belum selesai di baca"
    }
    else moveBookBtn.innerHTML = "Selesai dibaca"

    moveBookBtn.addEventListener("click",function(event){
        moveBook(event.target.parentElement.parentElement)
    })

    var deleteBookBtn = document.createElement("button")
    deleteBookBtn.classList.add("red")
    
    deleteBookBtn.addEventListener("click",function(event){
        deleteBook(event.target.parentElement.parentElement)
    })

    var editBookBtn = document.createElement("button")
    editBookBtn.classList.add("yellow")
    editBookBtn.innerHTML="Ubah Buku"
    editBookBtn.addEventListener("click",function(event){
        createEditModal(event.target.parentElement.parentElement)
    })

    actionContainer.append(moveBookBtn)
    actionContainer.append(editBookBtn)
    actionContainer.append(deleteBookBtn)
    article.append(titleBody)
    article.append(authorBody)
    article.append(yearBody)
    article.append(actionContainer)
    article.id = book.id


    return article
}

function refreshData(){
    const completedBook = document.getElementById(completed_id)
    const incompletedBook = document.getElementById(incompleted_id)

    for(book of books){
        if(book.isComplete){
            completedBook.append(makeBook(book))
        }else{
            incompletedBook.append(makeBook(book))
        }
    }
}

function findBookbyID(id)
{
    for(idx in books){
        if(books[idx].id == id)return idx
    }
}

function moveBook(container){
    
    var isComplete = container.querySelector(".green").innerHTML == "Selesai dibaca" ? false :true
    var idx = findBookbyID(container.id)
    books[idx].isComplete = !isComplete
    if(isComplete){
        // move to incomplete
        document.getElementById(incompleted_id).append(makeBook(books[idx]))
    }
    else{
        document.getElementById(completed_id).append(makeBook(books[idx]))
    }
    container.remove()
    updateStorageData()
}

function deleteBook(container){
    var tempBookIdx = findBookbyID(container.id)
    books.splice(tempBookIdx,1)
    container.remove()
    updateStorageData()
}

function updateStorageData(){
    localStorage.setItem("books",JSON.stringify(books))
}

function loadBooksFromStorageIfExists(){
    if(localStorage.getItem("books")){
        books = JSON.parse(localStorage.getItem("books"))
        
    }
}

function createEditModal(container){
    var idx = findBookbyID(container.id);
    var editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.style="display:flex"

    var editForm = document.forms["editForm"]
    var title = editForm["editBookTitle"]
    title.value = books[idx].title
    var author = editForm["editBookAuthor"]
    author.value = books[idx].author
    var year = editForm["editBookYear"]
    year.value = books[idx].year

    editForm.addEventListener("submit",function(event){
        books[idx].title = title.value
        books[idx].author = author.value
        books[idx].year = year.value
        var titleBody = container.querySelector("h3")
        var pBody = container.querySelectorAll("p")
        // var yearBody = container.querySelector("p:2")
        titleBody.innerHTML = title.value
        pBody[0].innerHTML = "Penulis: "+author.value
        pBody[1].innerHTML = "Tahun: " +year.value
        updateStorageData()
        editModal.style ="display:none"
        // console.log(yearBody)
        event.preventDefault()
    })

    var cancelBtn = document.getElementById("cancelBtn")
    cancelBtn.addEventListener("click",function(){
        editModal.style ="display:none"
    })
}