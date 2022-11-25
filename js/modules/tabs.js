function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'), //Слова из меню табов питания (Фитнес, Премиум, Постное, Сбалансированное)
        tabsContent = document.querySelectorAll('.tabcontent'), //Описание каждого питания и картинка из табов
        tabsParent = document.querySelector('.tabheader__items'); // Роидельский класс всего меню питания табов
    

    //Функция которая скрывает табы и удаляет класс активности
    function hideTabContent() { 
        tabsContent.forEach((item) => {
            // item.style.display = 'none'; // Скрываем все табы
            item.classList.add('hide'); // Добавить из CSS стилей класс .hide{display:none} Скрывает
            item.classList.remove('show', 'fade'); // Удалить из CSS стилей .show{display: block} Показать И удалить анимацию из CSS
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Удаляем класс активности
        });
    }
    //Функция которая будет показывать активный таб (i)
    function showTabContent(i = 0) { // Если аргумент i не будет передаваться, то аргументом станет 0, а это первый элемент
        // tabsContent[i].style.display = 'block'; // Показывает выбраный таб
        tabsContent[i].classList.add('show', 'fade'); // Добавить из CSS стилей .show{display: block} Показывает и fade анимация из CSS
        tabsContent[i].classList.remove('hide'); // Удаленние класса из CSS стилей
        tabs[i].classList.add('tabheader__item_active'); // Добавляет класс к элементу
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // присваиваем переменной event.target, чтобы потом каждый раз не писать это/ и это элемент на котором сработало событие

        if (target && target.classList.contains('tabheader__item')) {// Условие для проверки, имеет ли событие в себе класс tabheader__item. Чтобы событие срабатывало именнно на этом элементе, а не на родителе
            tabs.forEach((item, i) => { //item каждый таб который будет перебираться, а i его индекс
                if (target == item) { //Если тот элемент на котором произошло событие(target) будет совпадать с элементом который сейчас перебирается (Item)
                    hideTabContent();
                    showTabContent(i); // Передаем в аргумент индекс того элемента, на котором сейчас произошло событие
                }
            });
        }
    });
}

module.exports = tabs;