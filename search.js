

document.addEventListener("DOMContentLoaded",function(){
    loadBooksFromStorageIfExists()
    var query = location.search.substr("?title".length+1)
    var tempBooks = findBooksbyTitle(query)
    displayBooks(tempBooks)
})

function findBooksbyTitle(title){
    tempBook = []
    for(book of books){
        if(book.title.toLowerCase().match(title.toLowerCase()))tempBook.push(book)
    }
    console.log(tempBook)
    return tempBook
}

function displayBooks(tempBooks){
    const completedBook = document.getElementById(completed_id)
    const incompletedBook = document.getElementById(incompleted_id)
    
    for(book of tempBooks){
        if(book.isComplete){
            completedBook.append(makeBook(book))
        }else{
            incompletedBook.append(makeBook(book))
        }
    }
}