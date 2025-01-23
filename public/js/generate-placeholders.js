// Create emergency response background
const emergencyCanvas = document.createElement('canvas');
emergencyCanvas.width = 1920;
emergencyCanvas.height = 1080;
const ectx = emergencyCanvas.getContext('2d');
ectx.fillStyle = '#e63946';
ectx.fillRect(0, 0, 1920, 1080);
// Add some emergency-themed patterns
ectx.strokeStyle = '#ffffff';
for(let i = 0; i < 50; i++) {
    ectx.beginPath();
    ectx.moveTo(Math.random() * 1920, Math.random() * 1080);
    ectx.lineTo(Math.random() * 1920, Math.random() * 1080);
    ectx.stroke();
}
emergencyCanvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    // Use this URL as background-image for hero section
});

// Create tech background
const techCanvas = document.createElement('canvas');
techCanvas.width = 800;
techCanvas.height = 600;
const tctx = techCanvas.getContext('2d');
tctx.fillStyle = '#1d1d1d';
tctx.fillRect(0, 0, 800, 600);
// Add tech-themed grid pattern
tctx.strokeStyle = '#e63946';
for(let i = 0; i < 20; i++) {
    for(let j = 0; j < 15; j++) {
        tctx.strokeRect(i * 40, j * 40, 40, 40);
    }
} 