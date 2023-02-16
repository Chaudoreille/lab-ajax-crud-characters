/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById("template");
const characterContainer = document.querySelector(".characters-container");
const apiUrl = "api/characters";

document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
        try {
            const response = await axios.get(`${apiUrl}`);
            if (response.status === 200) {
                characterContainer.innerHTML = "";
                response.data.forEach((character) => {
                    const newCharacter =
                        characterTemplate.firstChild.cloneNode();
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {});

document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {});

document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {});

document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {});
