const button = document.querySelector("myButton");

const output = document.querySelector("output");

button.addEventListener("click",function() {

    const paragraph = document.createElement("p");
    paragraph.textContent ="Hello! I have successfully added a aparagraph using JavaScript";

    output.appendChild(paragraph);
});