const canvas = document.getElementById('drawing-canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-button');
const printButton = document.getElementById('print-button');

const canvasSize = 300; // Μέγεθος του καμβά σε pixels
const cellSize = 30; // Μέγεθος κελιών σε pixels
const cellsPerRow = canvasSize / cellSize; // Κελιά ανά σειρά

// Δημιουργία του καμβά
canvas.width = canvasSize;
canvas.height = canvasSize;

// Συνάρτηση που ορίζει το χρώμα για γέμισμα του κελιού
function setFillColor() {
    context.fillStyle = colorPicker.value;
}

// Συνάρτηση που χρωματίζει το κελί στις συντεταγμένες (row, col)
function fillCell(row, col) {
    context.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
}

// Αρχικοποίηση του καμβά
function initCanvas() {
    context.fillStyle = '#FFFFFF'; // Ορίζουμε το φόντο του καμβά σε άσπρο
    context.fillRect(0, 0, canvasSize, canvasSize); // Γεμίζουμε τον καμβά με το άσπρο χρώμα
    context.fillStyle = '#000000'; // Ορίζουμε το χρώμα της γραμμής και των στηλών σε μαύρο
    
    // Σχεδίαση των γραμμών
    for (let i = 0; i <= cellsPerRow; i++) {
        context.fillRect(i * cellSize, 0, 1, canvasSize);
    }

    // Σχεδίαση των στηλών
    for (let j = 0; j <= cellsPerRow; j++) {
        context.fillRect(0, j * cellSize, canvasSize, 1);
    }
}

// Αρχικοποίηση του καμβά όταν φορτώνεται η σελίδα
document.addEventListener('DOMContentLoaded', initCanvas);

// Χρωμάτισμα του κελιού όταν πατάτε το κουμπί "Κουβάς"
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    setFillColor();
    fillCell(row, col);
});

// Καθαρισμός του καμβά
clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvasSize, canvasSize);
    initCanvas();
});

// Εκτύπωση του καμβά
printButton.addEventListener('click', function() {
    window.print();
});