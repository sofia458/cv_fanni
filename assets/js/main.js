/* SHOW MENU */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    /* Validate that variables exist */
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            /* We add the show-menu class to the div tag with the nav_menu class */
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    /* When we click on each nav_link, we remove the show-menu class */
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')
        const link = document.querySelector('.nav_menu a[href*=' + sectionId + ']')

        if(!link) return

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            link.classList.add('active-link')
        }else{
            link.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* SHOW SCROLL TOP */
function scrollTop(){
    const scrollTopEl = document.getElementById('scrolltop');
    if(!scrollTopEl) return
    /* When the scroll is higher than 200 viewport height, add the show-scroll class */
    if(window.scrollY >= 200) scrollTopEl.classList.add('show-scroll'); else scrollTopEl.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

/* Previously selected topic (if user selected) */
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

/* We obtain the current theme that the interface has by validating the dark-theme class */
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

/* We validate if the user previously chose a topic */
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

/* Activate / deactivate the theme manually with the button */
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/* REDUCE THE SIZE AND PRINT ON AN A4 SHEET */
function scaleCv(){
    document.body.classList.add('scale-cv')
}

/* REMOVE THE SIZE WHEN THE CV IS DOWNLOADED */
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* GENERATE PDF */

/* PDF generated area */
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

/* Function to call areaCv and Html2Pdf options, sizing the PDF page to the real content height so it fits on ONE page */
function generateResume(){
    /* Measure the real rendered size (in px) once scale-cv is already applied */
    const widthPx = areaCv.scrollWidth
    const heightPx = areaCv.scrollHeight

    /* Convert px to mm (assuming 96 DPI) so jsPDF can use a custom page size */
    const pxToMm = 25.4 / 96
    const widthMm = widthPx * pxToMm
    const heightMm = heightPx * pxToMm

    let opt = {
      margin:       0,
      filename:     'CV_Nayeli_Lopez_Portillo_Ireta.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 4 },
      jsPDF:        { unit: 'mm', format: [widthMm, heightMm], orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all'] }
    };

    html2pdf(areaCv, opt)
}

/* When the button is clicked, it executes the three functions */
if (resumeButton) {
    resumeButton.addEventListener('click', () =>{
        /* 1. The class .scale-cv is added to the body, where it reduces the size of the elements */
        scaleCv()

        /* 2. The PDF is generated (measuring size AFTER scale-cv was applied) */
        generateResume()

        /* 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size. */
        setTimeout(removeScale, 5000)
    })
}