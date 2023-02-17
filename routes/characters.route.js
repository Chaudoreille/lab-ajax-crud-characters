const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Character = require("../models/Character.model");
/**
 * !All the routes here are prefixed with /api/characters
 */

const paramIdValidator = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Character id");
    }
    next();
};

const bodyCharacterValidator = (req, res, next) => {
    const errors = {};
    const { name, occupation, weapon, cartoon } = req.body;

    if (name && typeof name != "string") {
        errors["name"] = name;
    }
    if (occupation && typeof occupation != "string") {
        errors["occupation"] = occupation;
    }
    if (weapon && typeof weapon != "string") {
        errors["weapon"] = weapon;
    }
    if (cartoon && typeof cartoon != "boolean") {
        errors["cartoon"] = cartoon;
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).send(errors);
    }
    next();
};

/**
 * ? This route should respond with all the characters
 */
router.get("/", async (req, res, next) => {
    try {
        const allCharacters = await Character.find();

        res.status(allCharacters && allCharacters.length ? 200 : 204).send(
            allCharacters
        );
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", bodyCharacterValidator, async (req, res, next) => {
    try {
        const characterCreation = await Character.create(req.body);

        res.status(201).send(characterCreation);
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should respond with one character
 */
router.get("/:id", paramIdValidator, async (req, res, next) => {
    try {
        const character = await Character.findById(req.params.id);

        res.status(character ? 200 : 204).send(character);
    } catch (error) {
        next(error);
    }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch(
    "/:id",
    paramIdValidator,
    bodyCharacterValidator,
    async (req, res, next) => {
        try {
            const character = await Character.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

            res.status(200).send(character);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", paramIdValidator, async (req, res, next) => {
    try {
        const deletedCharacter = await Character.findByIdAndDelete(
            req.params.id
        );

        if (!deletedCharacter) {
            return res.status(400).send("Invalid Character id");
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
