// Blue-waves intersection observer
const blueWaves = document.querySelectorAll(".blue-wave");
const purpleWaves = document.querySelectorAll(".purple-wave");
for(let i = 4; i < blueWaves.length; i++){
    blueWaves[i].style.transition = `opacity 250ms calc(var(--blue-waves-delay) * ${i - 5}), transform 250ms calc(var(--blue-waves-delay) * ${i - 5})`;
}

const blueWavesObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        
        let wave = entry.target;
        if(entry.isIntersecting){

            wave.firstChild.src = wave.getAttribute("data-src");
            wave.firstChild.onload = () => {
                let bigPurpleWave = document.getElementById("bigPurpleWave");
                let topPurpleWaveContainer = document.getElementById("topPurpleWaveContainer");
                
                topPurpleWaveContainer.style.height = bigPurpleWave.getBoundingClientRect().height + "px";
                console.log(topPurpleWaveContainer, bigPurpleWave.getBoundingClientRect().height);
            }
            // Check if the wave is a top wave or a bottom wave. 
            if(wave.classList.contains("top-blue-wave")){

                wave.style.animation = `250ms ease-in-out calc(var(--blue-waves-delay) * ${entries.indexOf(entry)}) fade-in forwards,
                                        250ms ease-in-out calc(var(--blue-waves-delay) * ${entries.indexOf(entry)}) blue-wave-translate-up forwards`;

            } else if (wave.classList.contains("bottom-blue-wave")){
                // IDFK why using CSS animations only worked with the first set of waves
                // So now use individual CSS properties and the transition property.
                // IDK what the difference is between using animations and transitions but it works now.
                wave.style.opacity = "1";
                wave.style.top = "-150px";
                wave.style.transform = "translateY(140px)"
            } else if (wave.classList.contains("purple-top-wave")){
                wave.style.animation = `250ms ease-in-out calc(var(--blue-waves-delay) * ${entries.indexOf(entry)}) fade-in forwards,
                                        250ms ease-in-out calc(var(--blue-waves-delay) * ${entries.indexOf(entry)}) blue-wave-translate-up forwards`;
                
            }

            blueWavesObserver.unobserve(wave);
        } 

    })

}, {
    threshold: 1 // This is how much of the entry needs to be visible to run the code [0-1]
})

blueWaves.forEach(wave => {
    blueWavesObserver.observe(wave);
})
purpleWaves.forEach(wave => {
    blueWavesObserver.observe(wave);
})

const aboutContainerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // Run This code if the entry is visible 
        if(entry.isIntersecting){

            // Apply different properties depending on what type of element the entry is. 
            switch(entry.target.tagName){
                case "H1":
                case "H2":
                    entry.target.style.color = 'white';
                    break;
                case "P":
                    entry.target.style.opacity = 1;
                    break;
            }
        // Run this code if the entry is not visible 
        } else { 
            // Apply different properties depending on what type of element the entry is. 
            switch(entry.target.tagName){
                case "H1":
                case "H2":
                    entry.target.style.color = 'transparent';
                    break;
                case "P":
                    entry.target.style.opacity = 0;
                    break;
            }
        }
    })

},{
    threshold: 0.7
})

// Temp observer for the about section. It kills itself after it is run once. 
const aboutWrapperObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
        entries[0].target.style.animation = `250ms linear 0ms fade-in forwards, 250ms linear 0ms blue-wave-translate-up forwards`;
        aboutWrapperObserver.disconnect(); // die bitch
    }
}, {
    threshold: 0.4
})
aboutWrapperObserver.observe(document.querySelector(".about-section"));

const aboutFacts = document.querySelectorAll(".fact");
aboutContainerObserver.observe(document.querySelector(".about-title"));
aboutContainerObserver.observe(document.querySelector(".about-text"));
aboutFacts.forEach(fact => {
    aboutContainerObserver.observe(fact);
})


