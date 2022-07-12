/*
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
*/



document.addEventListener("DOMContentLoaded",function(){
    var form = document.forms["inputBook"];
    var title = form["inputBookTitle"];
    var author = form["inputBookAuthor"]
    var year = form["inputBookYear"]
    var isComplete = form["inputBookIsComplete"]

    isComplete.addEventListener("change",function(){
        if(isComplete.checked){
            document.getElementById("book_iscompleted").innerHTML="Selesai dibaca"
        }
        else{
            document.getElementById("book_iscompleted").innerHTML="Belum selesai dibaca"
        }
    })

    form.addEventListener("submit",function(event){
        event.preventDefault()
        addBooks(title.value,author.value,year.value,isComplete.checked)
    })

    loadBooksFromStorageIfExists()
    refreshData()
    
    
});





