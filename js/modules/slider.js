function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // container - родитель всех элементов слайдов, slide - каждый отдельный слайд, nextArrow - следующий слайд кнопка, 
    //prevArrow - предыдущая картинка, totalCounter - общее кол-во картинок показ.на странице
    // currentCounter - номер текущей картинки, wrapper - родитель всех слайдов(картинок), field - область видимости картинок
    // //--------------------------------------slide point

    const slider = document.querySelector(container), // Родитель всего элемента где слайды
        slides = document.querySelectorAll(slide),
        next = document.querySelector(nextArrow),
        prew = document.querySelector(prevArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper), // Родитель слайдов
        slidesField = document.querySelector(field), // Элемент, где будет видно все слайды
        width = window.getComputedStyle(slidesWrapper).width; // Размеры окна элемента где находятся слайды
    
    let slideIndex = 1; // Индекс который определяет текущее положение в слайдере. Изначально он равен 1
    let offset = 0; // Переменная куда будет записываться значение отступа в стороны

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Помещаем все слайды в slidesField. 100% умноженное на количество слайдов - общая длинна рулетки слайдов
    slidesField.style.width = 100 * slides.length + '%'; 
    //С помощью CSS стиля flex делаем так, чтобы слаыйды были горизонтально
    slidesField.style.display = 'flex';
    //Добавление анимации для плавной прокрутки слайдов
    slidesField.style.transition = '0.5s all';
    // Скрываем те элементы которые не попадают в область видимости. Чтобы было видно один, а остальные скрывались
    slidesWrapper.style.overflow = 'hidden';
    // ЧТобы у всех слайдов была одинаковая ширина. Переберем все слайды и каждому слайду установим определенную ширину width - окна где они показываются на странице
    slides.forEach(slide => {
        slide.style.width = width;
    });
    //Все элементы которые абсолютно спозициированны внутри слайдера будут нормально отображаться
    slider.style.position = 'relative';
    //Большая обертка для всех точек (ol) - order list
    const indicators = document.createElement('ol'),
        dots = []; // Массив куда будут добавляться все точки

    indicators.classList.add('carouser-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    // Создаем количество точек.ю относительно колличеству слайдов
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // li - элемент - точка
        // Каждой точке будет устанавливаться атрибут data-slide-to(к какому слайду она будет относится), и устанавливать нумераци.
        // Начиная с еденицы. Потому что первый слайд - это первая точка
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // Добавляем знак активности
        if (i == 0) { // Если идет первая итерация
            dot.style.opacity = 1; // Первая точка будет активна. opacity - непрозрачность, гду 1 непрозрачный 0 прозрачный
        }

        indicators.append(dot);
        dots.push(dot); // Добавляем в массив dots все точки
    }
    // Функция которая будет приобразовывать в числовой тип данных и заменять все не числа пустой строкой
    function deleteStr(str) {
       return +str.replace(/\D/g, '');
    }
    //Функция добавляющая ноль к не десятичному числу
    const getZeroNumbers = () => {       
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };
    // Функция которая делает все доты полупрозрачными кроме активной
    const dotsOpacity = (i) => {
        i.forEach(dot => {
            dot.style.opacity = '.5'; 
            // Делаем слайд непрозрачным
            dots[slideIndex - 1].style.opacity = 1;
        });
    };
    // translateX - трансформирование по оси Х `- ${offset}` сдвиг вправо
    next.addEventListener('click', () => {
        // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
        // Методом replace() заменить все нечисла пустой строкой
        if (offset == (deleteStr(width) * (slides.length - 1))) { // Если значение отступа равно длинне слайда * на кол-во слайдов -1
            offset = 0; // Долистали до самого конца и вернулись в начало
        } else { // Если не последний слайд
            offset += deleteStr(width); // Добавим смещение
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        // Если Значение индекса равен количеству слайдов - дошли до конца,
        if (slideIndex == slides.length) { 
            slideIndex = 1; // То откроется первый слайд
        } else { // Если не дошли до конца
            slideIndex++; // Тогда индекс увеличить на еденицу
        }
        getZeroNumbers();
        // Добавление 0 если индекс слайда меньше 10
        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
        dotsOpacity();
        // // Перебираем массив со всеми точками и устанавливаем и значение opacity = .5 - непрозрачность
        // dots.forEach(dot => dot.style.opacity = '.5'); 
        // // Делаем слайд непрозрачным
        // dots[slideIndex - 1].style.opacity = 1;
    });

    prew.addEventListener('click', () => {
        // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
        // Методом функцией deleteStr заменить все нечисла пустой строкой
        if (offset == 0) { // Долистали до самого начала
            offset = deleteStr(width) * (slides.length - 1); // Формула для определения последнего слайда Вернуться на последний слайд
        } else { // Если не первый слайд
            offset -= deleteStr(width); //Вычтем смещение смещение
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Определение смещения

        // Если Значение индекса равен 1 - дошли до Начала,
        if (slideIndex == 1) { 
            slideIndex = slides.length; // То откроется последний слайд
        } else { // Если не дошли до начала
            slideIndex--; // Тогда индекс уменьшить на еденицу
        }
        // Определение текущего слайда
        // Добавление 0 если индекс слайда меньше 10
        getZeroNumbers();
        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
        dotsOpacity();
        // dots.forEach(dot => dot.style.opacity = '.5'); 
        // // Делаем слайд непрозрачным
        // dots[slideIndex - 1].style.opacity = 1;
    });

    // Кликаем на точку и переключаемся между слайдами

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            // У каждой из точек есть атрибут 'data-slide-to', который мы получаем и на него будем ориентироваться 
            const slideTo = e.target.getAttribute('data-slide-to'); //e.target - тот элемент на котором было совершено событие

            slideIndex = slideTo; // Кликнули на 4 точку, в slideIndex присвоится 4 - откроется 4 картинка
            offset = deleteStr(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            // Определение текущего слайда
            // Добавление 0 если индекс слайда меньше 10
            getZeroNumbers();
            // if (slides.length < 10) {
            //     current.textContent = `0${slideIndex}`;
            // } else {
            //     current.textContent = slideIndex;
            // }
     
            //Перебираем массив со всеми точками и устанавливаем и значение opacity = .5 - непрозрачность
            dots.forEach(dot => dot.style.opacity = ".5"); 
            // Делаем слайд непрозрачным
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;