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


//Функция тассовки массива по алгоритму Фишера-Йетса
function shuffleArray(array) {
    let temp = [...array]
    for (let i = temp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
      }
      return temp
  }


//Генерация массива индексов. Индексы не повторяются по 8, по 6, по 3
function getArrayIndexes() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7]
    const resultArr = []

    let temp = shuffleArray(arr)

    let first = temp.slice(0, 3)
    let second = temp.slice(3, 6)
    let third = temp.slice(6)

    while(resultArr.length < 48) {
        resultArr.push(...shuffleArray(first))
        resultArr.push(...shuffleArray(second))
        resultArr.push(...shuffleArray(third))
    }
    return resultArr
}


//Генерация 48 объектов по индексам
async function getCardCollection() {
    const cardCollection = []
    const data = await getData()//массив объектов

    let randomIndexes = getArrayIndexes()
    randomIndexes.forEach(index => {
        cardCollection.push(data[index])
    })
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
