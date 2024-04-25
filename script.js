document.addEventListener('DOMContentLoaded', function() {
    const pages = [
        'page1.webp'
        // Add more pages as needed
    ];

    const viewer = document.getElementById('viewer');
    pages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        viewer.appendChild(img);
    });

    let currentPage = 0;
    function showPage(index) {
        const imgs = viewer.getElementsByTagName('img');
        Array.from(imgs).forEach((img, i) => {
            if (i === index) {
                img.classList.add('visible');
            } else {
                img.classList.remove('visible');
            }
        });
    }

    showPage(currentPage);

    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }
        var xprediction = data.x;
        var yprediction = data.y;

        if (xprediction > window.innerWidth * 0.9 && currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    }).begin();

    webgazer.showVideoPreview(true).showPredictionPoints(true);
});
