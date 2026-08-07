// Run when the page loads
window.addEventListener("load", () => {
    console.log("Welcome to Book My Stay!");

    const bookButton = document.querySelector(".btn");

    if (bookButton) {
        bookButton.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "rooms.html";
        });
    }
});