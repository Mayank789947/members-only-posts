const flashMessage = document.querySelector(".flash-message");

if (flashMessage) {

    setTimeout(() => {

        flashMessage.classList.add("flash-message-hide");

    }, 2000);

}