const anchors = document.querySelectorAll('a[href^="#"]');
const nav = document.getElementById('projectsNav');

anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
        anchor.scrollIntoView({
            behavior: "smooth",
            inline: 'center'
        });
    })
})
