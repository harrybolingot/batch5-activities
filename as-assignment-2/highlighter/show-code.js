var modal = document.getElementById("myModal");
var modalContent = document.getElementById("myModal-content");

var btn = document.getElementById("myBtn");
var closeButton = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    if (modal.classList.contains('show')){
        modal.classList.remove('show');
        modalContent.classList.remove('show');
    } 
    else{
        modal.classList.add('show');
        modalContent.classList.add('show');
    } 
}

closeButton.onclick = function() {
    modal.classList.remove('show');
    modalContent.classList.remove('show');
}

window.onclick = function(event) {
if (event.target == modal) {
    modal.classList.remove('show');
    modalContent.classList.remove('show');
    }
}