const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce');

// READ ALL
/**
 * @swagger
 * components:
 *   schemas:
 *     Annonce:
 *       type: object
 *       required:
 *         - titre
 *         - description
 *         - prix
 *       properties:
 *         titre:
 *           type: string
 *           description: The title of the annonce
 *         description:
 *           type: string
 *           description: The description of the annonce
 *         prix:
 *           type: number
 *           description: The price of the annonce
 *       example:
 *         titre: "Annonce 1"
 *         description: "This is a description"
 *         prix: 100
 */

/**
 * @swagger
 * /annonces:
 *   get:
 *     summary: Returns a list of all annonces
 *     responses:
 *       200:
 *         description: A list of annonces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Annonce'
 */
router.get('/annonces', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE 
/**
 * @swagger
 * /annonces:
 *   post:
 *     summary: Create a new annonce
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *     responses:
 *       201:
 *         description: The created annonce
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annonce'
 *       400:
 *         description: Bad request
 */
router.post('/annonces', async (req, res) => {
    const annonce = new Annonce({
        titre: req.body.titre,
        description: req.body.description,
        prix: req.body.prix
    });

    try {
        const nouvelleAnnonce = await annonce.save();
        res.status(201).json(nouvelleAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE
/**
 * @swagger
 * /annonces/edit/{id}:
 *   put:
 *     summary: Update an existing annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the annonce to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *     responses:
 *       200:
 *         description: The updated annonce
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annonce'
 *       400:
 *         description: Bad request
 */
router.get('/annonces/edit/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        res.render('edit', { annonce });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

/**
 * @swagger
 * /annonces/edit/{id}:
 *   post:
 *     summary: Update an existing annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the annonce to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *     responses:
 *       200:
 *         description: The updated annonce
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annonce'
 *       400:
 *         description: Bad request
 */
router.post('/annonces/edit/:id', async (req, res) => {
    try {
        const { titre, description, prix } = req.body;
        await Annonce.findByIdAndUpdate(req.params.id, { titre, description, prix });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

// DELETE
/**
 * @swagger
 * /annonces/delete/{id}:
 *   delete:
 *     summary: Delete an existing annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the annonce to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted annonce
 *       500:
 *         description: Server error
 */
router.get('/annonces/delete/:id', async (req, res) => {
    try {
        await Annonce.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
