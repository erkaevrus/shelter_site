/* ---BURGER MENU--- */
 const hamburger = document.querySelector('.hamburger')


// ---открытие/закрытие меню по клику на иконку---
const navigation = document.querySelector('.navigation')
const overlay = document.querySelector('.overlay')


const toggleMenu = function () {
    hamburger.classList.toggle('hamburger--open')
    navigation.classList.toggle('navigation--open')
    document.body.classList.toggle('body--lock')
    overlay.classList.toggle('overlay--active')
 }

hamburger.addEventListener('click', function(event) {
    event.stopPropagation()
    toggleMenu()
})

// ---закрытие меню по клику на ссылки---
const navigationLinks = document.querySelectorAll('.navigation__link')


const onMenuLinkClick = function () {
    if (hamburger.classList.contains('hamburger--open')) {
        toggleMenu()
    }
 }

navigationLinks.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation()
        onMenuLinkClick()
    })
})


// ---закрытие меню по клику на свободную область---
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('navigation')) {
        return
    }
    if (event.target.classList.contains('navigation__item')) {
        return
    }
    if (hamburger.classList.contains('hamburger--open')) {
        toggleMenu()
    }
})
