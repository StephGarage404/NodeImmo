const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.

    // titre de l'annonce
    titre: {
        type: String,
        required: true,
    },
    // prix de l'annonce
    prix: {
        type: Number,
        required: true,
    },
    // description de l'annonce
    description: {
        type: String,
        required: true,
    },
});

// l'etape de transformation du schema en modele sert a creer des instances de donnees
// a partir du schema et d'y ajouter des comportements (methodes)
// ici nous n'ajoutons pas de comportements mais on pourrait le faire avec par exemple
// annonceSchema.methods.rateAnnonce = function() { rating code here }

// annonceSchema.methods.rateAnnonce = function() {
//     console.log("Rating the annonce");
// }

// le premier argument est le nom du modele, le deuxieme est le schema
// le nom du modele est important car il sera utilise pour creer la collection dans la base de donnees
const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;