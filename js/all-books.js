// /* --- check which breed has been chosen and hide other books ---- */

document.querySelectorAll('.br-btn').forEach(button => {
    button.addEventListener('click', event => {
        
        var breed = button.id; 
                
        document.querySelectorAll(".book-cover").forEach(book => {
            var bookClasses = book.classList.value;
            if (bookClasses.includes(breed) === false ){
                book.classList.add("dont-display-breed");
            } else {
                book.classList.remove("dont-display-breed");
            }
        })

    })
})
