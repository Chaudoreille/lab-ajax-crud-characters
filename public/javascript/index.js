/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.querySelector("#template").content;
const characterContainer = document.querySelector(".characters-container");
const apiUrl = "api/characters";
const fetchOneIdInput = document.querySelector("input[name=character-name]");
const deleteIdInput = document.querySelector("input[name=character-id-delete]");

function fillCharacter(domCharacterInfo, data) {
    const charInfo = domCharacterInfo.querySelector(".character-info");
    const id = domCharacterInfo.querySelector(".character-id > span");
    const name = domCharacterInfo.querySelector(".name > span");
    const occupation = domCharacterInfo.querySelector(".occupation > span");
    const cartoon = domCharacterInfo.querySelector(".cartoon > span");
    const weapon = domCharacterInfo.querySelector(".weapon > span");

    charInfo.dataset.id = data._id;
    id.innerText = data._id;
    name.innerText = data.name;
    occupation.innerText = data.occupation;
    cartoon.innerText = data.cartoon ? "TRUE" : "FALSE";
    weapon.innerText = data.weapon;
}

document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
        try {
            const response = await axios.get(`${apiUrl}`);

            if (response.status === 200) {
                characterContainer.innerHTML = "";
                response.data.forEach((character) => {
                    const newCharacter = characterTemplate.cloneNode(true);
                    fillCharacter(newCharacter, character);
                    characterContainer.append(newCharacter);
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
        try {
            const id = fetchOneIdInput.value;
            const response = await axios.get(`${apiUrl}/${id}`);

            if (response.status === 200) {
                const newCharacter = characterTemplate.cloneNode(true);
                characterContainer.innerHTML = "";
                fillCharacter(newCharacter, response.data);
                characterContainer.append(newCharacter);
                fetchOneIdInput.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    });

document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
        try {
            const id = deleteIdInput.value;
            const response = await axios.delete(`${apiUrl}/${id}`);

            if (response.status === 204) {
                document
                    .querySelectorAll(`.character-info[data-id="${id}"]`)
                    .forEach((deletedCharacter) => {
                        deletedCharacter.remove();
                    });
                deleteIdInput.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    });

document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {});

document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {});
