// function checkHit(){
//     let guess = document.getElementById("guessInput").value
//     alert("test" + guess.value)
// }

var view = {
    displayMessage: function(msg){
        const messageArea = document.getElementById("message");
        messageArea.innerHTML = msg;
    },

    displayHit: function(location){
        const hit = document.getElementById(location);
        hit.setAttribute('class', "hit");
    },

    displayMiss: function(location){
        const miss = document.getElementById(location);
        miss.setAttribute("class", "miss")
    }
}