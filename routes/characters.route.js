const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Character = require("../models/Character.model");
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get("/", async (req, res, next) => {
    try {
        const allCharacters = await Character.find();

        if (!allCharacters || !allCharacters.length) {
            res.status(204);
        } else {
            res.status(200);
        }
        res.send(allCharacters);
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
    try {
        const errors = {};
        const { name, occupation, weapon, cartoon } = req.body;

        if (typeof name != "string") errors["name"] = name;
        if (typeof occupation != "string") errors["occupation"] = occupation;
        if (typeof weapon != "string") errors["weapon"] = weapon;
        if (typeof cartoon != "boolean") errors["cartoon"] = cartoon;

        if (Object.keys(errors).length > 0) {
            return res.status(400).send(errors);
        }

        const characterCreation = await Character.create({
            name,
            occupation,
            weapon,
            cartoon,
        });

        res.status(201).send(characterCreation);
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should respond with one character
 */
router.get("/:id", async (req, res, next) => {
    try {
        const characterId = req.params.id;
        if (!mongoose.isValidObjectId(characterId)) {
            res.status(400).send("Invalid Character id");
        }
        const character = await Character.findById(characterId);

        if (!character) {
            res.status(204);
        } else {
            res.status(200);
        }
        res.send(character);
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
    try {
        const errors = {};
        const { name, occupation, weapon, cartoon } = req.body;

        const characterId = req.params.id;

        if (!mongoose.isValidObjectId(characterId)) {
            errors.id = "Invalid Character id";
        }
        if (name && typeof name != "string") errors["name"] = name;
        if (occupation && typeof occupation != "string")
            errors["occupation"] = occupation;
        if (weapon && typeof weapon != "string") errors["weapon"] = weapon;
        if (cartoon && typeof cartoon != "boolean") errors["cartoon"] = cartoon;

        if (Object.keys(errors).length > 0) {
            return res.status(400).send(errors);
        }

        const character = await Character.findByIdAndUpdate(
            characterId,
            {
                name,
                occupation,
                weapon,
                cartoon,
            },
            {
                new: true,
            }
        );

        res.status(200).send(character);
    } catch (error) {
        next(error);
    }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", (req, res, next) => {
    /**Your code goes here */
});

module.exports = router;
