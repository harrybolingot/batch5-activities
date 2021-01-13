var modal = document.getElementById("myModal");
var modalContent = document.getElementById("myModal-content");
var body = document.getElementsByTagName('body')[0];

var btn = document.getElementById("myBtn");
var closeButton = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    if (modal.classList.contains('show')){
        modal.classList.remove('show');
        modalContent.classList.remove('show');
        body.style.overflow = 'initial';
    } 
    else{
        modal.classList.add('show');
        modalContent.classList.add('show');
        body.style.overflow = 'hidden';
    } 
}

closeButton.onclick = function() {
    modal.classList.remove('show');
    modalContent.classList.remove('show');
    body.style.overflow = 'initial';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        modalContent.classList.remove('show');
        body.style.overflow = 'initial';
    }
}