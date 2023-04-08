import cardsInfo from "../data/pets.js"; // импорт массива объектов с карточками


/* ---ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ--- */

const sliderLine = document.querySelector('.slider__line')

let offset = 0 //смещение от левого края
let sliderWidth = 1080 //ширина окна слайдера при текущей ширине экрана
let numberOfCard = 3 //количество карточек на странице при текущей ширине экрана


let lineCard = [] //массив объектов сгенерированных карточек


let prevArr = []
let currArr = []
let nextArr = []
const endIndex = 7


/* ---ЛОГИКА СОЗДАНИЯ ИНДЕКСОВ--- */

//Генерация рандомного числа от Min до Max
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Генерация стартового массива
function getInitArr() {

    while (currArr.length < numberOfCard) {
        let index = getRandomNum(0, endIndex)
        if (!currArr.includes(index)) {
            currArr.push(index)
        }
    }
}


//Генерация следующего массива
function getNextArr() {

    while (nextArr.length < numberOfCard) {
        let index = getRandomNum(0, endIndex)
        if (!currArr.includes(index) && !nextArr.includes(index)) {
            nextArr.push(index)
        }
    }
}


//Генерация предыдущего массива
function getPrevArr() {

    while (prevArr.length < numberOfCard) {
        let index = getRandomNum(0, endIndex)
        if (!currArr.includes(index) && !prevArr.includes(index)) {
            prevArr.push(index)
        }
    }
}


//Перемещение индексов при создании новой коллекции по кнопке Next
function updateToNextArr() {
    prevArr = [...currArr]
    currArr = []
    currArr = [...nextArr]
    nextArr = []
}


//Перемещение индексов без создания новой коллекции по кнопке Prev
function switchToPrevArr() {
    let temp = [...currArr]
    currArr = []
    currArr = [...prevArr]
    nextArr = [...temp]
    prevArr = []
    temp = []
}


//Перемещение индексов при создании новой коллекции по кнопке Prev
function updateToPrevArr() {
    nextArr = [...currArr]
    currArr = []
    currArr = [...prevArr]
    prevArr = []
}


//Перемещение индексов без создания новой коллекции по кнопке Next
function switchToNextArr() {
    let temp = [...currArr]
    currArr = []
    currArr = [...nextArr]
    prevArr = [...temp]
    nextArr = []
    temp = []
}



/* ---РАБОТА С КАРТОЧКАМИ--- */

//Генерация карточек
function createCards(cardIndexes) {
    lineCard = []

    cardsInfo.forEach((item, index) => {
        if (cardIndexes.includes(index)) {
            let card = document.createElement('div')
            card.classList.add('slider__item')
            card.dataset.name = item.name
            card.dataset.img = item.img
            card.dataset.type = item.type
            card.dataset.breed = item.breed
            card.dataset.description = item.description
            card.dataset.age = item.age
            card.dataset.inoculations = item.inoculations
            card.dataset.diseases = item.diseases
            card.dataset.parasites = item.parasites
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


//Добавление карточек при инициализации
function initCard() {
    getInitArr()
    createCards(currArr)
    lineCard.forEach(item => {
        document.querySelector('.slider__line').appendChild(item)
    })
}


//Добавление карточек в конец при клике по кнопке Next
function appendCard() {
    getNextArr()
    createCards(nextArr)
    updateToNextArr()

    lineCard.forEach(item => {
        document.querySelector('.slider__line').appendChild(item)
    })
}


//Добавление карточек в начало при клике по кнопке Prev
function prependCard() {
    getPrevArr()
    createCards(prevArr)
    updateToPrevArr()

    lineCard.forEach(item => {
        document.querySelector('.slider__line').prepend(item)
    })
}


//Удаление карточек из начала
function deleteCardsFromStart() {
    setTimeout(function () {
        let SliderItems = document.querySelectorAll('.slider__item')
        for (let i = 0; i < SliderItems.length; i++) {
            if ( i < numberOfCard) {
                SliderItems[i].remove()
            }
        }
        sliderLine.classList.add('no-transition')
        sliderLine.style.left = -sliderWidth + 'px'
        offset = sliderWidth
    }, 1000)
}


//Удаление карточек из конца
function deleteCardsFromEnd() {
    setTimeout(function () {
        let SliderItems = document.querySelectorAll('.slider__item')
        for (let i = 0; i < SliderItems.length; i++) {
            if ( i >= numberOfCard * 2) {
                SliderItems[i].remove()
            }
        }
    }, 1000)
}


//Очистка окна слайдера
function clearSlider() {
    let SliderItems = document.querySelectorAll('.slider__item')
    for (let i = 0; i < SliderItems.length; i++) {
            SliderItems[i].remove()
    }
}


/* ---ПЕРЕКЛЮЧЕНИЕ СЛАЙДЕРА--- */

//Пролистывание вправо
const btnNextSlides = document.querySelector('.slider__next')

function nextSlides() {
    btnNextSlides.removeEventListener('click', nextSlides)
    btnPrevSlides.removeEventListener('click', prevSlides)

    sliderLine.classList.remove('no-transition')
    let leftProp = Number((sliderLine.style.left).slice(0, -2))

    if (leftProp === -sliderWidth || document.querySelectorAll('.slider__item').length === numberOfCard) {
        appendCard()
    } else {
        switchToNextArr()
    }

    if (document.querySelectorAll('.slider__item').length > numberOfCard * 2) {
        deleteCardsFromStart()
    }
    offset += sliderWidth
    sliderLine.style.left = -offset + 'px'

    setTimeout(function() {
        btnNextSlides.addEventListener('click', nextSlides)
        btnPrevSlides.addEventListener('click', prevSlides)

        }, 1000)
}

btnNextSlides.addEventListener('click', nextSlides)


//Пролистывание влево
const btnPrevSlides = document.querySelector('.slider__prev')

function prevSlides() {
    btnNextSlides.removeEventListener('click', nextSlides)
    btnPrevSlides.removeEventListener('click', prevSlides)

    sliderLine.classList.remove('no-transition')
    let leftProp = Number((sliderLine.style.left).slice(0, -2))

    if (leftProp === 0 || document.querySelectorAll('.slider__item').length === numberOfCard) {
        prependCard()
        sliderLine.classList.add('no-transition')
        sliderLine.style.left = -sliderWidth + 'px'
        offset = sliderWidth
    } else {
        switchToPrevArr()
    }

    if (document.querySelectorAll('.slider__item').length > numberOfCard * 2) {
        deleteCardsFromEnd()
    }

    offset -= sliderWidth;
    setTimeout(function() {
        sliderLine.classList.remove('no-transition')
        sliderLine.style.left = -offset + 'px'
     }, 0)

     setTimeout(function() {
        btnNextSlides.addEventListener('click', nextSlides)
        btnPrevSlides.addEventListener('click', prevSlides)
     }, 1000)
}

btnPrevSlides.addEventListener('click', prevSlides)


/* ---ПЕРЕСТРОЕНИЕ СТРАНИЦЫ--- */

//Перестроение карточек при переходе с Таблетки на Десктоп
const mediaToDesctopFromTablet = window.matchMedia('(min-width: 1200px)')

function rebuildPageToDesctop(event) {
    if (event.matches) {
        clearSlider()
        sliderWidth = 1080
        numberOfCard = 3
        offset = 0
        currArr = []
        nextArr = []
        prevArr = []
        lineCard = []
        sliderLine.style.left = 0 + 'px'
        initCard()
    }
}

mediaToDesctopFromTablet.addListener(rebuildPageToDesctop)
rebuildPageToDesctop(mediaToDesctopFromTablet)


//Перестроение карточек при переходе с Таблетки на Мобилку
const mediaToMobileFromTablet = window.matchMedia('(max-width: 760px)')

function rebuildPageToMobile(event) {
    if (event.matches) {
        clearSlider()
        sliderWidth = 310
        numberOfCard = 1
        offset = 0
        currArr = []
        nextArr = []
        prevArr = []
        lineCard = []
        sliderLine.style.left = 0 + 'px'
        initCard()
    }
}
mediaToMobileFromTablet.addListener(rebuildPageToMobile)
rebuildPageToMobile(mediaToMobileFromTablet)


//Перестроение карточек при переходе на Таблетку
const mediaToTablet = window.matchMedia('(min-width: 760px) and (max-width: 1200px)')

function rebuildPageToTablet(event) {
    if (event.matches) {
        clearSlider()
        sliderWidth = 620
        numberOfCard = 2
        offset = 0
        currArr = []
        nextArr = []
        prevArr = []
        lineCard = []
        sliderLine.style.left = 0 + 'px'
        initCard()
    }
}
mediaToTablet.addListener(rebuildPageToTablet)
rebuildPageToTablet(mediaToTablet)
