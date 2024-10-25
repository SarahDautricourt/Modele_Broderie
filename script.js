// Sélectionne le canvas par son ID
const canvas = document.getElementById("broderieCanvas");
// Récupère le contexte de dessin en 2D
const ctx = canvas.getContext('2d');
const gridSize = 20; // Taille de chaque cellule de la grille
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//Récupération du fichier JSON
const reponse = await fetch('couleursDMC.json');
const couleursDMC = await reponse.json();

const gestionCouleurs = document.querySelector(".choix-couleurs");

//initialisation de la couleur par défaut noir
let couleurChoisi = '#000000';

let outilActif = "stylo";

const grilleClaire = document.querySelector(".ma-grille-claire")

const grilleSombre = document.querySelector(".ma-grille-sombre")

canvas.style.backgroundColor = 'white'
ctx.strokeStyle = '#ddd';

// Sélectionne les éléments de contrôle
const largeurInput = document.getElementById('largeurCanvas');
const hauteurInput = document.getElementById('hauteurCanvas');
const boutonRedimensionner = document.getElementById('redimensionnerCanvas');

// Fonction pour redimensionner le canvas
function redimensionnerCanvas() {
    // Récupérer les nouvelles dimensions
    const nouvelleLargeur = parseInt(largeurInput.value);
    const nouvelleHauteur = parseInt(hauteurInput.value);

    // Mettre à jour la taille du canvas
    canvas.width = nouvelleLargeur;
    canvas.height = nouvelleHauteur;

    // Redessiner la grille après redimensionnement
    drawGrid();
}

// Événement sur le bouton pour redimensionner
boutonRedimensionner.addEventListener('click', redimensionnerCanvas);

function changerThemeGrille (theme) {
    if (theme === 'clair') {
        canvas.style.backgroundColor = 'white'; // Couleur de fond blanche pour thème clair
        ctx.strokeStyle = '#ddd'; // Couleur des lignes de grille claire
        couleurChoisi = 'black';
        outilActif = "stylo";
    } else if (theme === 'sombre') {
        canvas.style.backgroundColor = 'black'; // Couleur de fond noire pour thème sombre
        ctx.strokeStyle = '#303030'; // Couleur des lignes de grille sombre
        couleurChoisi = 'white';
        outilActif = "stylo";
    }
    // Redessiner la grille après le changement de thème
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
    drawGrid(); // Redessine la grille avec la nouvelle couleur
};

grilleClaire.addEventListener('click', (event) => {
    changerThemeGrille('clair');
});

grilleSombre.addEventListener('click', (event) => {
    changerThemeGrille('sombre');
});
//Récupération de la sélection de la couleur
gestionCouleurs.addEventListener('change', (event) => {
    couleurChoisi = event.target.value;
});

//Création des boutons de couleurs
for (let i = 0; i < couleursDMC.length; i++) {
    const choixCouleurs = couleursDMC[i];
    const couleurElement = document.createElement("option");
    couleurElement.textContent = choixCouleurs.codeDMC;
    couleurElement.value = choixCouleurs.hex;
    couleurElement.style.background = choixCouleurs.hex;
    gestionCouleurs.appendChild(couleurElement);
};

let grille = [];
for (let i = 0; i < canvasWidth / gridSize; i++) {
    grille[i] = [];
    for (let j = 0; j < canvasHeight / gridSize; j++) {
        grille[i][j] = { rempli: false}; // Par défaut, case vide et blanche
    };
};

// Fonction pour dessiner la grille
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface tout le canvas avant de redessiner
    for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.strokeRect(x, y, gridSize, gridSize); // Dessine chaque case
        }
    }
}

// Fonction pour remplir un carré à la position cliquée
function fillSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize); // Remplit le carré cliqué
    ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize); // Redessine la bordure du carré
};

//Récupération du bouton de la gomme
const gomme = document.querySelector(".ma-gomme");

gomme.addEventListener('click', (event) => {
    outilActif = "gomme";
});

////Récupération du bouton du stylo
const stylo = document.querySelector(".mon-stylo");

stylo.addEventListener('click', (event) => {
    outilActif = "stylo";
});

//Récupération du bouton de la pipette
const pipette = document.querySelector(".ma-pipette");

pipette.addEventListener('click', (event) => {
    outilActif = "pipette";
});

// Écouteur d'événements pour détecter le clic de l'utilisateur
canvas.addEventListener('click', (event) => {
    // Récupère la position du clic dans le canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convertit la position en coordonnées de grille
    const gridX = Math.floor(mouseX / gridSize);
    const gridY = Math.floor(mouseY / gridSize);
    
    if (outilActif === "stylo") {
        fillSquare(gridX, gridY, couleurChoisi); // Remplir la case avec la couleur choisie
        grille[gridX][gridY].rempli = true;      // Met à jour l'état de remplissage
        grille[gridX][gridY].couleur = couleurChoisi;  // Met à jour la couleur
    } else if (outilActif === "gomme") {
        // Effacer la case (mettre en blanc)
        if (canvas.style.backgroundColor === 'white') {
            fillSquare(gridX, gridY, 'white'); // Effacer en mettant la couleur de fond (blanc)
            grille[gridX][gridY] = false; // Met à jour l'état à "vide"    
        } else {
            fillSquare(gridX, gridY, 'black'); // Effacer en mettant la couleur de fond (noir)
            grille[gridX][gridY] = false; // Met à jour l'état à "vide"    
        }
    } else if (outilActif === "pipette") {
        // Vérifier que la case cliquée contient une couleur
        const couleurCase = grille[gridX][gridY].couleur;
        if (couleurCase) {  // Si la case a déjà une couleur
            console.log("Couleur récupérée par la pipette :", couleurCase);
            couleurChoisi = couleurCase;  // Mettre à jour la couleur choisie
            outilActif = "stylo"; // L'outil actif redevient le stylo après avoir utilisé la pipette
        } else {
            console.log("La case est vide, aucune couleur à récupérer.");
        }
    }
    });

//Écouteur d'événements pour détecter le clic droit de l'utilisateur
canvas.addEventListener('contextmenu', (event) => {
    if (outilActif === "stylo") {
        // Empêche le menu contextuel par défaut d'apparaître
        event.preventDefault();
        
        // Récupère la position du clic dans le canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Convertit la position en coordonnées de grille
        const gridX = Math.floor(mouseX / gridSize);
        const gridY = Math.floor(mouseY / gridSize);

        if (canvas.style.backgroundColor === 'white') {
            fillSquare(gridX, gridY, 'white'); // Effacer en mettant la couleur de fond (blanc)
            grille[gridX][gridY] = false; // Met à jour l'état à "vide"    
        } else {
            fillSquare(gridX, gridY, 'black'); // Effacer en mettant la couleur de fond (noir)
            grille[gridX][gridY] = false; // Met à jour l'état à "vide"    
        }


    }
});

//Récupération du bouton de suppression
const boutonSupprimer = document.querySelector(".bouton-suppression");

//Création de la fonction suppression de la grille
function suppressionGrille() {
    // Réinitialiser l'état de la grille
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            grille[i][j] = false; // Met à jour chaque case à "vide"
    }
    // Redessiner la grille sur le canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Efface le canvas
    drawGrid(); // Redessine la grille
    };
};

boutonSupprimer.addEventListener('click', (event) => {
    suppressionGrille();
});

// Dessine la grille au démarrage
drawGrid();
