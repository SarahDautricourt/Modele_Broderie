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

let couleurChoisi = '#000000'

gestionCouleurs.addEventListener('change', (event) => {
    couleurChoisi = event.target.value;
    console.log(couleurChoisi); // Vérifie si tu récupères la bonne couleur
});

//Création des boutons de couleurs
for (let i = 0; i < couleursDMC.length; i++) {
    const choixCouleurs = couleursDMC[i];
    const couleurElement = document.createElement("option");
    couleurElement.textContent = choixCouleurs.codeDMC;
    couleurElement.value = choixCouleurs.hex;
    couleurElement.style.background = choixCouleurs.hex;
    gestionCouleurs.appendChild(couleurElement);
}

let grille = [];
for (let i = 0; i < canvasWidth / gridSize; i++) {
    grille[i] = [];
    for (let j = 0; j < canvasHeight / gridSize; j++) {
        grille[i][j] = false; // Par défaut, toutes les cases sont vides
    }
}


// Fonction pour dessiner la grille
function drawGrid() {
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        for (let y = 0; y <= canvasHeight; y += gridSize) {
            ctx.strokeStyle = '#ddd'; // Couleur des lignes
            ctx.strokeRect(x, y, gridSize, gridSize); // Dessine un carré
        }
    }
}

// Fonction pour remplir un carré à la position cliquée
function fillSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize); // Remplit le carré cliqué
    ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize); // Redessine la bordure du carré
}

// Écouteur d'événements pour détecter le clic de l'utilisateur
canvas.addEventListener('click', (event) => {
    // Récupère la position du clic dans le canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convertit la position en coordonnées de grille
    const gridX = Math.floor(mouseX / gridSize);
    const gridY = Math.floor(mouseY / gridSize);
    
    
    fillSquare(gridX, gridY, couleurChoisi); // Remplir de noir
    grille[gridX][gridY] = true; // Met à jour l'état à "rempli"
});

canvas.addEventListener('contextmenu', (event) => {
    // Empêche le menu contextuel par défaut d'apparaître
    event.preventDefault();
    
    // Récupère la position du clic dans le canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convertit la position en coordonnées de grille
    const gridX = Math.floor(mouseX / gridSize);
    const gridY = Math.floor(mouseY / gridSize);

    fillSquare(gridX, gridY, 'white'); // Effacer en mettant la couleur de fond (blanc)
    grille[gridX][gridY] = false; // Met à jour l'état à "vide"
})
//Récupération du bouton de suppression
const boutonSupprimer = document.querySelector(".bouton-suppression")

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
    }
}

const gomme = document.querySelector(".ma-gomme")

gomme.addEventListener('click', (event) => {
    canvas.addEventListener('click', (event) => {
        // Empêche le menu contextuel par défaut d'apparaître
        event.preventDefault();
        
        // Récupère la position du clic dans le canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Convertit la position en coordonnées de grille
        const gridX = Math.floor(mouseX / gridSize);
        const gridY = Math.floor(mouseY / gridSize);
    
        fillSquare(gridX, gridY, 'white'); // Effacer en mettant la couleur de fond (blanc)
        grille[gridX][gridY] = false; // Met à jour l'état à "vide"
    });
});

const stylo = document.querySelector(".mon-stylo")

stylo.addEventListener('click', (event) => {
    canvas.addEventListener('click', (event) => {
        // Récupère la position du clic dans le canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Convertit la position en coordonnées de grille
        const gridX = Math.floor(mouseX / gridSize);
        const gridY = Math.floor(mouseY / gridSize);
        
        
        fillSquare(gridX, gridY, couleurChoisi); // Remplir de noir
        grille[gridX][gridY] = true; // Met à jour l'état à "rempli"
    });
});

boutonSupprimer.addEventListener('click', (event) => {
    suppressionGrille()
});

// Dessine la grille au démarrage
drawGrid();
