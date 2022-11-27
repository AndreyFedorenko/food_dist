function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // Чтобы при открытии модального окна нельзя было скролить старницу
    if (modalTimerId) { // Если передается как аргумент в функцию modalTimerId, тогда его можно очистить
        clearInterval(modalTimerId); // Если пользователь сам открыл модальное окно, то оно не откроемся через таймер
    }

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //Чтобы после закрытии модального окна можно было скролить старницу
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    
    const modalTrigger = document.querySelectorAll(triggerSelector), // расширение data-modal написали в HTML документе всем кнопкам для открытия модальных окон
        modal = document.querySelector(modalSelector); // само моадльное коно
        // modalCloseBtn = document.querySelector('[data-close]'); // дописали modal-close кнопке (крестик на модальном окне) которая закрывает модальное окно
    //Обработчик события на открытие всех модальных окон на странице
    modalTrigger.forEach((item) => {
    // С помощью стрелочной функции вызываем функцию openModal, потому что при работе с обработчиком событий функцию можно передавать без вызова
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
    //Обработчик события закрытия модального окна, если пользователь нажал на крести на модальном одке
    // modalCloseBtn.addEventListener('click', closeModal);
    //Обработчик события для закрытия модального окна, если пользователь нажал мимо модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //Если событие(е) на котором оно произошло (target) произошло самомму модальному окну (modal)
            // ИЛИ у события (e) на котором оно произошло(target) есть атрибут data-close (getAttribute('data-close')) который равен пустой строке
            closeModal(modalSelector);
        }
    });
    // Обработчик события закрытия моадльного окна если пользователь нажал ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {//Если пользователь нажал ESC
            closeModal(modalSelector);
        }
    });
    //Функция когда пользователь долистал до конца сраницы и открывается модальное окно
    //pageYOffset - показывает прокрученную часть сайта пользователем/ document.documentElement.clientHeight - видимая на данный момент чать страницы
    //без прокрутки. document.documentElement.scrollHeight - максимальная длинна всей страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { 
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //Сработает всего однажды когда пользователь долистая=ет до конца страницы
        }
    }
    //Обработчик события на открытие модального окна, если пользователь долистал до конца страицы
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;

export {closeModal};
export {openModal};