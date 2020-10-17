'use strict'
const fields = document.querySelectorAll('.js-form__item-field')

document.querySelector('.js-form__submit')?.addEventListener('click', () => {
    let data = {}

    fields.forEach(item => data[item.name] = item.value)

    if (!Object.values(data).every(Boolean)) {
        alert('Не все поля заполнены!')
    } else {
        axios.post(`/api/user/register`, data)
            .then(({ data }) => {
                window.location.pathname = '/'
            })
            .catch(err => (
                alert('Ошибка регистрации'),
                console.error(err)
            ))
    }
})