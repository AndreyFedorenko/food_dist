// Функция Function Expression которая будет работать с данными от сервера. url - адрес сервера. data - данные с сервера
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: { 
            'Content-type': 'application/json' 
        },
        body: data
    });
    return await res.json(); // Полученный промис от сервера, обработка данных в json формат
};
// Асинхронная функция для получения данных от сервера
async function getResourse(url) {
    const res = await fetch(url);

    if (!res.ok) { // Если что-то пошло не так
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    // Вернуть данные в формате JSON
    return await res.json(); 
    }

export {postData};
export {getResourse};