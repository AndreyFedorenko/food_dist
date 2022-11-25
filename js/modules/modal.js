function modal() {
        //---------------------------------------------------------------modal----------------------------------------------
    const modalTrigger = document.querySelectorAll('[data-modal]'), // расширение data-modal написали в HTML документе всем кнопакам для открытия модальных окан
        modal = document.querySelector('.modal'); // само моадльное коно
        // modalCloseBtn = document.querySelector('[data-close]'); // дописали modal-close кнопке (крестик на модальном окне) которая закрывает модальное окно

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // Чтобы при открытии модального окна нельзя было скролить старницу
        clearInterval(modalTimerId); // Если пользователь сам открыл модальное окно, то оно не откроемся через таймер
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //Чтобы после закрытии модального окна можно было скролить старницу
    }
    //Обработчик события на открытие всех модальных окон на странице
    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });
    //Обработчик события закрытия модального окна, если пользователь нажал на крести на модальном одке
    // modalCloseBtn.addEventListener('click', closeModal);
    //Обработчик события для закрытия модального окна, если пользователь нажал мимо модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //Если событие(е) на котором оно произошло (target) произошло самомму модальному окну (modal)
            // ИЛИ у события (e) на котором оно произошло(target) есть атрибут data-close (getAttribute('data-close')) который равен пустой строке
            closeModal();
        }
    });
    // Обработчик события закрытия моадльного окна если пользователь нажал ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {//Если пользователь нажал ESC
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000000); //через 50 сек выходит модальное окно
    //Функция когда пользователь долистал до конца сраницы и открывается модальное окно
    //pageYOffset - показывает прокрученную часть сайта пользователем/ document.documentElement.clientHeight - видимая на данный момент чать страницы
    //без прокрутки. document.documentElement.scrollHeight - максимальная длинна всей страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { 
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //Сработает всего однажды когда пользователь долистая=ет до конца страницы
        }
    }
    //Обработчик события на открытие модального окна, если пользователь долистал до конца страицы
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;