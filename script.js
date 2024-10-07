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
canvas.addEventListener('click', function(event) {
    // Récupère la position du clic dans le canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convertit la position en coordonnées de grille
    const gridX = Math.floor(mouseX / gridSize);
    const gridY = Math.floor(mouseY / gridSize);
    
    if (grille[gridX][gridY]) {
        // Si la case est remplie, on efface
        fillSquare(gridX, gridY, 'white'); // Effacer en mettant la couleur de fond (blanc)
        grille[gridX][gridY] = false; // Met à jour l'état à "vide"
    } else {
        // Sinon, on remplit la case
        fillSquare(gridX, gridY, '#000000'); // Remplir de noir
        grille[gridX][gridY] = true; // Met à jour l'état à "rempli"
    }
});
//Récupération du bouton de suppression
const boutonSupprimer = document.querySelector(".bouton_suppression")

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

boutonSupprimer.addEventListener('click', (event) => {
    suppressionGrille()
});

// Dessine la grille au démarrage
drawGrid();
