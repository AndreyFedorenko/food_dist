function timer(id, deadLine) {
    // Функция которая будет определять разницу между deadLine и текущим времинем пользователя
    function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()); // Получаем кол-во мс из deadLine и вычитаем из реальной даты
        let days, hours, minutes, seconds;
        //Условие для того, чтобы когда кончится время акции появились нули
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //Math.floor() - округляет до целых. Высчитываем кол-во дней
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // % делит с остатком и возвращает остаток
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);  
        }
        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //Функция котоорая будет подставлять 0 в часах если там 1 число (9 => 09)
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // Функция которая будет устонавливать наш таймер на страницу
    function setClock (selector, endtime) { // selector аргументом является div="timer" в котором хранятся объекты с день, ч, мин, сек со станицы
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // Обновление цифр на странице через каждую секунду
        
        updateClock(); // Запуск функции для того, чтобы часы на странице обновились до того, как начнет работат setInterval()

        function updateClock() {
            const t = getTimeRemaining(endtime);
            //В объекты полученные со страницы через innerHTML меняем данными получеными из объекта который возвращает функция getTimeRemaining
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //Остановка setInterval тогда, когда разница во времени будет = 0
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadLine);
}

export default timer;