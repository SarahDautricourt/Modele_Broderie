// Sélectionne le canvas par son ID
const canvas = document.getElementById("broderieCanvas");
// Récupère le contexte de dessin en 2D
const ctx = canvas.getContext('2d');
const gridSize = 20; // Taille de chaque cellule de la grille
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

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
    
    // Remplit le carré à la position cliquée avec une couleur
    fillSquare(gridX, gridY, '#000000'); // Noir par défaut
});

// Dessine la grille au démarrage
drawGrid();