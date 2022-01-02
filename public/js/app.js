const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const icon = document.querySelector('.icon')

const img = document.createElement('img');
icon.appendChild(img);

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    icon.removeChild(img);

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = `${data.forecast},Temperature: ${data.temperature} degree`;
                if (data.forecast === 'Mist') {
                    console.log('mist')
                    img.src = '/img/mist.gif';
                }
                else if (data.forecast === 'Sunny') {
                    console.log('sunny')
                    img.src = '/img/sunny.gif';
                }
                else {
                    img.src = data.iconUrl;
                }
                icon.appendChild(img);
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    });
})