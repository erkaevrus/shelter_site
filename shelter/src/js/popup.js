

//Отрисовка модального окна в HTML
function drawPopup() {
    const data = this.dataset
    let modalWindow = document.createElement('div')
    modalWindow.classList.add('popup')
    modalWindow.innerHTML =
        `
        <div class="wrapper">
            <div class="close-popup btn-round btn-round--bordered"><span class="btn-round--cross"></span></div>
            <div class="popup__container">
                <img class="popup__img" src="${data.img}" alt="${data.type}">
                </img>
                <div class="popup__content">
                    <h3 class="popup__title">${data.name}</h3>
                    <h4 class="popup__subtitle"><span>${data.type}</span> - <span>${data.breed}</span></h4>
                    <h5 class="popup__text">${data.description}</h5>
                    <ul class="popup__list">
                        <li class="popup__li"><h5 class="popup__list-item"><b>Age:</b> ${data.age}</h5></li>
                        <li class="popup__li"><h5 class="popup__list-item"><b>Inoculations:</b> ${data.inoculations}</h5></li>
                        <li class="popup__li"><h5 class="popup__list-item"><b>Diseases:</b> ${data.diseases}</h5></li>
                        <li class="popup__li"><h5 class="popup__list-item"><b>Parasites:</b> ${data.parasites}</h5></li>
                    </ul>
                </div>
            </div>
        </div>
        `
    document.querySelector('.body').appendChild(modalWindow)
 }


//Отображение модального окна
function displayPopup(event) {
    let target = event.target.parentElement //проверяем является ли у конечного элемента клика родитель наша карточка

    if(target.classList.contains('slider__item')) {
        let drawPopupWithCtx = drawPopup.bind(target) //привязываем контекст
        drawPopupWithCtx()
        setTimeout(function() {
            document.querySelector('.popup').classList.add('popup--active')
        }, 200)

        document.querySelector('.overlay').classList.add('overlay--active')
        document.body.classList.add('body--lock')
    }
}

document.querySelector('.slider__line').addEventListener('click', function(event) {
    displayPopup(event)
}) //вешаем листнер на окно слайдера и передаем куда именно кликнули


//Закрытие модального окна
function closePopup() {
    document.querySelector('.popup').remove()
    document.body.classList.remove('body--lock')
    document.querySelector('.overlay').classList.remove('overlay--active')
}

document.addEventListener('click', function(event) {
    if(event.target.classList.contains('close-popup')) {
        closePopup()
        return
    }

    if(event.target.parentElement.classList.contains('popup')) {
        return
    }

    if(event.target.classList.contains('popup')) {
        closePopup()
    }
})
