const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

window.onload = function() {
    document.querySelectorAll(".scramble").forEach(item => {
        item.addEventListener("mouseover", scramble);
    });
}

function scramble(event) {
    let iterations = 0;
    const originalValue = event.target.dataset.value;

    let interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if(index < iterations){
                    return originalValue[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("")

        iterations += 1 / 3;

        if(iterations > originalValue.length){
            clearInterval(interval);
            event.target.innerText = originalValue;
        }
    }, 30);
}
