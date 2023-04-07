/* ---ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ--- */
const cardCollection = await getCardCollection() //сгенерированный массив объектов
let cardsOnPage = 8 //количество карточек на странице при текущей ширине экрана
let pageNum = 1 // номер текущей страницы
const numberOfCard = 48 // Общее количество карточек


/* ---ГЕНЕРАЦИЯ МАССИВА С ОБЪЕКТАМИ--- */

//Фетчим массив объектов из json
async function getData() {
    const response = await fetch('../../src/data/pets.json')
    const data = await response.json()
    return data
}


//Генерация рандомного числа от Min до Max
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Генерация случайныйх индексов от 0 до endIndex. Индексы не повторяются
function getRandomIndexes() {
    const randomIndexes = []
    const endIndex = 7

    while (randomIndexes.length <= endIndex) {
        let index = getRandomNum(0, endIndex)
        if (!randomIndexes.includes(index)) {
            randomIndexes.push(index)
        }
    }
    return randomIndexes
}


//Генерация 48 объектов, где каждые 8 объектов перемешиваются в случайном порядке
async function getCardCollection() {
    const cardCollection = []
    const numberOfCard = 48
    const data = await getData()//массив объектов
    while (cardCollection.length < numberOfCard) {
        let randomIndexes = getRandomIndexes()
        randomIndexes.forEach(index => {
        cardCollection.push(data[index])
        })
    }
    return cardCollection
}


/* ---РАБОТА С КАРТОЧКАМИ--- */

//Отрисовка карточек на странице
function displayPage() {
    let startSlice = (pageNum - 1) * cardsOnPage
    let endSlice = startSlice + cardsOnPage
    let lineCard = cardCollection.slice(startSlice, endSlice)

    lineCard.forEach((item) => {
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
        document.querySelector('.our-friends__content').appendChild(card)
    })
}


//Удаление всех карточек со страницы
function deleteCardsFromPage() {
    document.querySelectorAll('.slider__item').forEach(item => {
        item.remove()
    })
}


/* ---БЛОК ПАГИНАЦИИ--- */

//кнопка ">"
const nextPage = document.querySelector('.pagination__next')
nextPage.addEventListener('click', function() {
    if (pageNum === numberOfCard / cardsOnPage) return
    if (prevPage.classList.contains('btn-round--inactive')) {
        prevPage.classList.remove('btn-round--inactive')
        firstPage.classList.remove('btn-round--inactive')
    }

    deleteCardsFromPage()
    pageNum++

    if (pageNum === numberOfCard / cardsOnPage) {
        lastPage.classList.add('btn-round--inactive')
        nextPage.classList.add('btn-round--inactive')
    }

    setNumPage()
    displayPage()
})


//кнопка ">>"
const lastPage = document.querySelector('.pagination__last')
lastPage.addEventListener('click', function() {
    if (pageNum === numberOfCard / cardsOnPage) return

    if (prevPage.classList.contains('btn-round--inactive')) {
        prevPage.classList.remove('btn-round--inactive')
        firstPage.classList.remove('btn-round--inactive')
    }

    lastPage.classList.add('btn-round--inactive')
    nextPage.classList.add('btn-round--inactive')


    deleteCardsFromPage()
    pageNum = numberOfCard / cardsOnPage
    setNumPage()
    displayPage()
})


//кнопка "<"
const prevPage = document.querySelector('.pagination__prev')
prevPage.addEventListener('click', function() {
    if (pageNum === 1) return
    if (nextPage.classList.contains('btn-round--inactive')) {
        nextPage.classList.remove('btn-round--inactive')
        lastPage.classList.remove('btn-round--inactive')
    }

    deleteCardsFromPage()
    pageNum--

    if (pageNum === 1) {
        firstPage.classList.add('btn-round--inactive')
        prevPage.classList.add('btn-round--inactive')
    }

    setNumPage()
    displayPage()
})


//кнопка "<<"
const firstPage = document.querySelector('.pagination__first')
firstPage.addEventListener('click', function() {
    if (pageNum === 1) return
    if (nextPage.classList.contains('btn-round--inactive')) {
        nextPage.classList.remove('btn-round--inactive')
        lastPage.classList.remove('btn-round--inactive')
    }

    firstPage.classList.add('btn-round--inactive')
    prevPage.classList.add('btn-round--inactive')

    deleteCardsFromPage()
    pageNum = 1
    setNumPage()
    displayPage()
})


//Отображение номера текущей страницы
function setNumPage() {
    document.querySelector('.pagination__num').innerText = String(pageNum)
}


//возврат к первой странице при перестроении страницы
function backToFirstPage() {
    pageNum = 1
    firstPage.classList.add('btn-round--inactive')
    prevPage.classList.add('btn-round--inactive')
    nextPage.classList.remove('btn-round--inactive')
    lastPage.classList.remove('btn-round--inactive')
    setNumPage()
}


/* ---ПЕРЕСТРОЕНИЕ СТРАНИЦЫ--- */

//Перестроение карточек при переходе с Таблетки на Десктоп
const mediaToDesctopFromTablet = window.matchMedia('(min-width: 1275px)')

function rebuildPageToDesctop(event) {
    if (event.matches) {
        deleteCardsFromPage()
        cardsOnPage = 8
        pageNum = 1
        displayPage()
    }
}

mediaToDesctopFromTablet.addListener(rebuildPageToDesctop)
rebuildPageToDesctop(mediaToDesctopFromTablet)


//Перестроение карточек при переходе с Таблетки на Мобилку
const mediaToMobileFromTablet = window.matchMedia('(max-width: 705px)')

function rebuildPageToMobile(event) {
    if (event.matches) {
        deleteCardsFromPage()
        cardsOnPage = 3
        backToFirstPage()
        displayPage()
    }
}
mediaToMobileFromTablet.addListener(rebuildPageToMobile)
rebuildPageToMobile(mediaToMobileFromTablet)


//Перестроение карточек при переходе на Таблетку
const mediaToTablet = window.matchMedia('(min-width: 705px) and (max-width: 1275px)')

function rebuildPageToTablet(event) {
    if (event.matches) {
        deleteCardsFromPage()
        cardsOnPage = 6
        backToFirstPage()
        displayPage()
    }
}
mediaToTablet.addListener(rebuildPageToTablet)
rebuildPageToTablet(mediaToTablet)
