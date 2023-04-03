import cardsInfo from "../data/pets.js";


const sliderLine = document.querySelector('.slider__line')

let offset = 0 //смещение от левого края
let sliderWidth //ширина видимого окна слайдера
let sliderLineWidth //ширина видимого окна слайдера + отступы между карточек
let cardIndexes = [] //псевдослучайный набор индексов карточек
let numberOfCard //количество отображаемых карточек
let lineCard = [] //сгенерированный ряд карточек


//вычисление ширины видимого окна слайдера
const getSliderWidth = function () {
    const sliderContainer = document.querySelector('.slider__container')
    sliderWidth = Number((window.getComputedStyle(sliderContainer, null).getPropertyValue("max-width")).slice(0,3))
}
getSliderWidth()

// window.addEventListener('resize', function() {
//     getSliderWidth()
// })


//вычисление ширины окна + отступы
const getSliderLineWidth = function () {
    switch(sliderWidth) {
        case 990:
        sliderLineWidth = 1080
        numberOfCard = 3
        break

        case 580:
        sliderLineWidth = 620
        numberOfCard = 2
        break

        case 270:
        sliderLineWidth = 310
        numberOfCard = 1
        break
    }
}
getSliderLineWidth()



//генерация рандомного числа от Min до Max
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//генерация случайных индексов от 0 до maxIndex в списке объектов
const getCardIndexes = function () {
    let temp = [...cardIndexes]
    cardIndexes = []
    const maxIndexOfCollection = cardsInfo.length - 1
    while (cardIndexes.length < numberOfCard) {
        let index = getRandomNum(0, maxIndexOfCollection)
        if (!cardIndexes.includes(index) && !temp.includes(index)) {
            cardIndexes.push(index)
        }
    }
    temp = []
}


//генерация карточек
const createCards = function () {
    lineCard = []
    getCardIndexes()
    cardsInfo.forEach((item, index) => {
        if (cardIndexes.includes(index)) {
            let card = document.createElement('div')
            card.classList.add('slider__item')
            card.innerHTML =
                `
                <img class="slider__img" src="${item.img}" alt="${item.type}" >
                <p class="slider__title">${item.name}</p>
                <button class="button button--bordered">Learn more</button>
                `
            lineCard.push(card)
        }
    })
}


//Добавление карточек в конец
const appendCard = function () {
    createCards()
    lineCard.forEach(item => {document.querySelector('.slider__line').appendChild(item)})
}


//Удаление карточек из начала
const deleteCardsFromStart = function () {
    btnNextSlides.removeEventListener('click', nextSlides)
    setTimeout(function () {
        let SliderItems = document.querySelectorAll('.slider__item')
        for (let i = 0; i < SliderItems.length; i++) {
            if ( i < numberOfCard) {
                SliderItems[i].remove()
            }
        }
        sliderLine.classList.add('no-transition')
        sliderLine.style.left = -sliderLineWidth + 'px'
        offset = sliderLineWidth
        btnNextSlides.addEventListener('click', nextSlides)
    }, 1000)
}


//Пролистывание вправо
const btnNextSlides = document.querySelector('.slider__next')

const nextSlides = function () {
    sliderLine.classList.remove('no-transition')
    let leftProp = Number((sliderLine.style.left).slice(0, -2))

    if (leftProp === -sliderLineWidth || document.querySelectorAll('.slider__item').length === numberOfCard) {
        appendCard()
    }

    if (document.querySelectorAll('.slider__item').length > numberOfCard * 2) {
        deleteCardsFromStart()
    }
    offset += sliderLineWidth
    sliderLine.style.left = -offset + 'px'
}

btnNextSlides.addEventListener('click', nextSlides)


//Добавление карточек в начало
const prependCard = function () {
    createCards()
    lineCard.forEach(item => {document.querySelector('.slider__line').prepend(item)})
}


//Удаление карточек из конца
const deleteCardsFromEnd = function () {
    setTimeout(function () {
        btnNextSlides.removeEventListener('click', nextSlides)
        let SliderItems = document.querySelectorAll('.slider__item')
        for (let i = 0; i < SliderItems.length; i++) {
            if ( i >= numberOfCard * 2) {
                SliderItems[i].remove()
            }
        }
        btnNextSlides.addEventListener('click', nextSlides)
    }, 1000)
}


//Пролистывание влево
const btnPrevSlides = document.querySelector('.slider__prev')

const prevSlides = function () {
    sliderLine.classList.remove('no-transition')
    let leftProp = Number((sliderLine.style.left).slice(0, -2))

    if (leftProp === 0 || document.querySelectorAll('.slider__item').length === numberOfCard) {
        prependCard()
        sliderLine.classList.add('no-transition')
        sliderLine.style.left = -sliderLineWidth + 'px'
        offset = sliderLineWidth
    }

    if (document.querySelectorAll('.slider__item').length > numberOfCard * 2) {
        deleteCardsFromEnd()
    }

    offset -= sliderLineWidth;
    setTimeout(function() {
        sliderLine.classList.remove('no-transition')
        sliderLine.style.left = -offset + 'px'
    }, 0)
}

btnPrevSlides.addEventListener('click', prevSlides)


//загрузка карточек при формировании дом дерева
window.addEventListener('DOMContentLoaded', appendCard)


//Очистка окна слайдера
const clearSlider = function () {
    let SliderItems = document.querySelectorAll('.slider__item')
    for (let i = 0; i < SliderItems.length; i++) {
            SliderItems[i].remove()
    }
}

// let VieportWidth = 0

// const getViewportWidth = function () {
//     VieportWidth = window.screen.width
//     console.log(VieportWidth)
// }

// document.addEventListener('resize', getViewportWidth)
