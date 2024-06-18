function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

let score = 0;
let maxScore = 100; // Set a maximum score to fill the progress bar

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score.toString();
    updateProgress();
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = Math.min((score / maxScore) * 100, 100); // Limit maximum percentage to 100
    progressFill.style.width = percentage + '%';
}

function drop(event) {
    event.preventDefault();
    const bin = event.target.closest('.bin'); // Ensure the target is the bin itself
    const data = event.dataTransfer.getData("text");
    const element = document.getElementById(data);

    const nonCompostable = {
        plasticBag: "Good job! Plastic bags should go into the recycling bin because they can be turned into new products. This keeps our Earth cleaner and reduces harmful waste!",
        can: "Good job! Cans are perfect for the recycling bin because they are made from metal, which can be melted down and reused to make new products. Recycling cans helps save energy and resources, keeping our planet healthier!",
        shoe: "Good job! Shoes can often be recycled or repurposed. Donating shoes or recycling helps to reclaim materials for new products, reducing waste and supporting our community!",
        pizza_box: "Good job! Pizza boxes that are clean and grease-free can be recycled, turning the cardboard into new paper products. This helps to reduce waste and conserve natural resources."
    };

    const compostable = {
        bananaPeel: "Well done! Banana peels are good food for the compost. They break down and help make the soil very healthy for plants to grow!",
        appleCore: "Great! An apple core breaks down and adds important nutrients back into the soil, helping plants grow better and keeping the earth happy and healthy!",
        eggshell: "Well done! Eggshells add special minerals to the compost that help plants grow strong and healthy. It’s like giving vitamins to the soil!",
        nutshell: "Good! Nut shells take a long time to break down, but once they do, they make the soil extra strong. This helps the garden plants grow big and sturdy!",
        rice: "Super! Composting leftover rice helps it turn into food for the soil. This makes the earth really happy because it can feed more plants and help them grow strong and healthy!",
        vegetable: "Excellent! When we compost vegetables, we stop them from ending up in places called landfills, where they can make harmful gases. By composting, we turn them into good, healthy soil instead. This helps our Earth breathe better and stay happy!"
    };

    if (element && element.draggable) {
        if (bin.id === "recyclingBin" && nonCompostable[element.id]) {
            alert(nonCompostable[element.id]);
            updateScore(20);
            bin.appendChild(element);  // Visually move the element to the bin
        } else if (bin.id === "compostBin" && compostable[element.id]) {
            alert(compostable[element.id]);
            updateScore(20);
            bin.appendChild(element);
        } else {
            alert("This item does not belong in the selected bin.");
            updateScore(-10);
        }
    }
}

document.querySelectorAll('#items img').forEach(img => {
    img.addEventListener('dragstart', drag);
});
