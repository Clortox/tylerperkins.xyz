const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

window.onload = function() {
    document.querySelectorAll(".scramble").forEach(item => {
        item.addEventListener("mouseover", scramble);
    });

    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax')
        let scrollPosition = window.pageYOffset;

        parallax.style.transform = 'translateY(' + scrollPosition * .5 + 'px)';
    })
}

function scramble(event){
    scrambleLetters(event.target);
}

function scrambleLetters(element) {
    let iterations = 0;
    const originalValue = element.dataset.value;

    let interval = setInterval(() => {
        element.innerText = element.innerText.split("")
            .map((letter, index) => {
                if(index < iterations){
                    return originalValue[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("")

        iterations += 1 / 3;

        if(iterations > originalValue.length){
            clearInterval(interval);
            element.innerText = originalValue;
        }
    }, 30);
}


