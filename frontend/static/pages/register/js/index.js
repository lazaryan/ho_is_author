'use strict'
const fields = document.querySelectorAll('.js-form__item-field')

const validations = {
    email: email => {
        if (!email) {
            return 'Введите Вашу почту'
        }

        if (!emailValidator(email)) {
            return 'Введена не корректная почта'
        }

        return ''
    },
    password: password => {
        if (!password || password.length < 8) {
            return 'Введен слишком короткий пароль. Минимальная длина - 8 символов'
        }

        return ''
    }
}

document.querySelector('.js-form__submit')?.addEventListener('click', () => {
    const data = {};
    let errors = false;

    fields.forEach(item => {
        if (errors) return;

        if (validations[item.name]) {
            errors = validations[item.name](item.value)

            if (errors) {
                return;
            }
        }

        if (item.classList.contains('js-form-require') && !item.value) {
            errors = 'Не все поля заполнены!';
            return;
        } else if (item.type !== 'radio' || item.checked) {
            data[item.name] = item.value;
        }
    })

    if (errors) {
        alert(errors)
    } else {
        axios.post(`/api/user/register`, data, {
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
                alert('Ошибка регистрации'),
                console.error(err)
            ))
    }
})
