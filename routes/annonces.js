const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce');

// READ
router.get('/', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.render('index', { annonces });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE
router.get('/annonces/create', (req, res) => {
    res.render('form', { annonce: {} });
});


router.post('/', async (req, res) => {
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
router.get('/annonces/edit/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        res.render('edit', { annonce });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

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
router.get('/annonces/delete/:id', async (req, res) => {
    try {
        await Annonce.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;

