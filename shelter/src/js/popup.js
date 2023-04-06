





//Отрисовка модального окна
function drawPopup() {
    const data = this.dataset
    let modalWindow = document.createElement('div')
    modalWindow.classList.add('popup')
    modalWindow.innerHTML =
        `
        <div class="wrapper">
            <div class="btn-round btn-round--bordered"><span class="btn-round--cross"></span></div>
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


//kjfkjf -- в этом месте теряется контекст.
function displayPopup() {
    drawPopup()
    document.querySelector('.popup').classList.add('popup--active')
}

//Добавляем листнеры всем карточкам на странице
export function addListenerToCards() {
    document.querySelectorAll('.slider__item').forEach(item => {
    item.addEventListener('click', displayPopup)
    })
}
addListenerToCards()
