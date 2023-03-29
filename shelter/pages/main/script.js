/* ---BURGER MENU--- */
 const hamburger = document.querySelector('.hamburger')


// ---close/open menu by click on burger icon---
const navigation = document.querySelector('.navigation')
const overlay = document.querySelector('.overlay')


const toggleMenu = function () {
    hamburger.classList.toggle('hamburger--open')
    navigation.classList.toggle('navigation--open')
    document.body.classList.toggle('body--lock')
    overlay.classList.toggle('overlay--active')
 }

hamburger.addEventListener('click', toggleMenu)

// ---close menu by click on each link---
const navigationLinks = document.querySelectorAll('.navigation__link')


const onMenuLinkClick = function () {
    if (hamburger.classList.contains('hamburger--open')) {
        toggleMenu()
    }
 }

navigationLinks.forEach(item => {
    item.addEventListener('click', onMenuLinkClick)
})


// ---close menu by click on free area---
// document.addEventListener('click', function() {
//     if (hamburger.classList.contains('hamburger--open')) {
//         toggleMenu()
//     }
// })
