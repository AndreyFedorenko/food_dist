function forms() {
    //------------------------------------------form server

    const forms = document.querySelectorAll('form');

    const message = { // список сообщений при отправке формы пользователем
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжеимся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // Перебор псевдомассива с формами
    bindPostData(item); // где каждая форма передается как аргумент в функцию
    }); 

    // Функция Function Expression которая будет работать с данными от сервера. url - адрес сервера. data - данные с сервера
    const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { 
            'Content-type': 'application/json' 
        },
        body: data
    });

    return await res.json(); // Полученный промис от сервера, обработка данных в json формат

    };

    // Функция которая отвечает за постинг данных
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {// e - событие которое сработает на каждой кнопке с формой
            e.preventDefault();// отменяем станд.пов брауз., чтобы при отправке не перезагружался браузер

            // Создание нового элемента (крестик), куда будет выводиться сообщение об отправке формы
            let statusMessage = document.createElement('img'); // Изображение загрузки при отправке формы
            statusMessage.src = message.loading; //Добавление атрибута src к картинке загрузки
            // Добавление CSS стилей, которые применятся inline. Чтобы установить изображение по центру
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);// Добавление нового элемента. 1 арг - куда вставить 'afterend' - после формы 

            // Передача formData - это специальный объект, который позволяет из формы быстро сформировать
            // данные которые заполнил пользователь
            const formData = new FormData(form); // Собирает все данный с форм на странице

            const json = JSON.stringify(Object.fromEntries(formData.entries()));// Переводим данные в матрицу массивов, а далее наоборот из матрицы в объект и превращаем все это в JSON

            postData('http://localhost:3000/requests', json) // Вернется промис в формате json
            .then(data => { // data - данные которые возвращаются из промиса
                console.log(data); 
                showThanksModal(message.success); // Когда данные были отправлены на сервер
                statusMessage.remove();// Удаляет со страницы спрнер
            }).catch(() => {
                showThanksModal(message.failure); // Когда произошла какая-то ошибка
            }).finally(() => { // Выполняется всегда после then или catch
                form.reset();// очистка форм, чтобы после ввода и отправки очищался input
            });
        });

    }

    // Создание окна в котором будет писаться сообщение о статусе отправки формы
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Модальное окно, которое уже есть в HTML 
        prevModalDialog.classList.add('hide'); //Добавляем класс который скрывает из CSS
        openModal(); // Функция которая отвечает за открытие модальных окон

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); // добавляем класс который был в CSS новому элементу (чтобы они выглядели одинаково, так как перадаются все CSS стили)
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); // добавляем в элемент modal новый div
        setTimeout(() => {
            thanksModal.remove();// Удаление нашего div через 4 сек gjckt njuj rfr jnhf,jnftn aeyrwbz
            prevModalDialog.classList.add('show');// Добалвяем класс
            prevModalDialog.classList.remove('hide'); // Удаляем класс невидимости
            closeModal(); // ЧТобы пользователь не видел как удаляется модальное окно
        }, 4000);
    }
}

module.exports = forms;