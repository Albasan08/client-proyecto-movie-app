const profile = document.querySelector(".profile");
const dropdown = document.querySelector(".dropdown__wrapper");

profile.addEventListener("click", () => {
    dropdown.classList.remove("none");
    dropdown.classList.toggle("hide");
});

const menuBtn = document.querySelector(".icon");
menuBtn.addEventListener("click", (e) => {
    console.log(e.target);
    e.target.classList.toggle("active");
});

const likeButtons = document.querySelectorAll(".card__btn");

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__btn--like");
    });
});
