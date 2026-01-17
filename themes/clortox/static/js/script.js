const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const typeWriterSpeed = 60;

window.onload = function() {
    document.querySelectorAll(".scramble").forEach(item => {
        item.addEventListener("mouseover", scramble);
    });

    // Set parallax height once on load
    let parallax = document.querySelector('.parallax');
    if (parallax) {
        let content = document.querySelector('#content');
        // Set height to content height but don't go below viewport height
        let contentHeight = content.scrollHeight;
        let parallaxHeight = Math.max(contentHeight, window.innerHeight);
        parallax.style.height = parallaxHeight + "px";

        // Add scroll listener for parallax effect
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            // Move background down slower than scroll (creates parallax depth)
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    document.querySelectorAll(".typewriter").forEach(item => {
        observer.observe(item);
    });
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function replaceSpacesWithNbsp(string) {
    if (string == null) return;
    return string.replace(/ /g, "\xa0");
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

async function typeWriter(element) {
    let typeWriterText = element.getAttribute("data-value");
    let output = element.innerText;

    // write the main text
    for(let i = 0; i < typeWriterText.length; ++i){
        output += typeWriterText.charAt(i);
        // sleep for typeWriterSpeed milliseconds
        await sleep(typeWriterSpeed);
        element.innerText = output;
    }

    //try and do the paragraphs associated
    let hiddenElementId = element.getAttribute("data-show");

    if(hiddenElementId == null) return;

    let hiddenElement = document.getElementById(hiddenElementId);
    let hiddenElementSpeed = 5;

    let paragraphs = hiddenElement.querySelectorAll("p");
    for (let p of paragraphs){
        let hiddenElementText = p.getAttribute("data-value");
        //hiddenElementText = replaceSpacesWithNbsp(hiddenElementText);
        p.innerHtml = "";
        output = "";

        for (let i = 0; i < hiddenElementText.length; ++i){
            output += hiddenElementText.charAt(i);
            await sleep(hiddenElementSpeed);
            p.innerText = output; 
        }

        await sleep(50);
    }
}

let observer = new IntersectionObserver(function(entries) {
    for (let entry of entries){
        // If the element is visible, start the animation
        if(entry.isIntersecting) {
            typeWriter(entry.target);
            observer.unobserve(entry.target);
        }
    }
}, { threshold: 0.7 });
