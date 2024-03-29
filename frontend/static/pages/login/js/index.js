'use strict'
const fields = document.querySelectorAll('.js-form__item-field')

document.querySelector('.js-form__submit')?.addEventListener('click', () => {
    let data = {}

    fields.forEach(item => data[item.name] = item.value)

    if (!Object.values(data).every(Boolean)) {
        alert('Не все поля заполнены!')
    } else {
        axios.post(`/api/user/login/`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({ data }) => {
                if (data.meta.status === 'ERROR') {
                    console.error(data.meta.message)
                    alert(data.meta.message)
                } else {
                    window.location.pathname = data.redirect;
                }
            })
            .catch(err => (
                alert('Ошибка авторизации'),
                console.error(err)
            ))
    }
})
