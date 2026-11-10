
const button = document.querySelector("#changeColor");

const heading = document.querySelector("#heading");
const paragraph = document.querySelector("#paragraph");

button.addEventListener("click", function() {

    const randomColor = "#" + Math.floor(
        Math.random() * 16777215
    ).toString(16).padStart(6, "0");

    heading.style.color = randomColor;
    paragraph.style.color = randomColor;

});
