import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Flex } from 'reflexbox'
import { Container, Text, Dropdown, Icon, Skeleton as UISkeleton } from 'ui'

import theme from 'theme'

import {Store } from './reducers'

import './asserts/header.css'

export const Component: React.FC<any> = () => {
    const history = useHistory()
    const user = useSelector<Store['main']>((state: Store) => state.main)

    const changeLocation = (location: string, reload = false) => {
        !reload ? history.push(location) : window.location.pathname = location
    }

    return (
        <Container sx={{ width: '100%' }}>
            <Container.Header sx={{ justifyContent: 'space-between' }} style={{ borderRadius: '0' }}>
                <Text styles={theme.text.styles.header}>Hello! Ho is author?</Text>
                <Dropdown toggle={
                    <Flex alignItems="center">
                        <Icon background={user.status ? theme.mixin.icons.blue.user : theme.mixin.icons.light.user} sx={{ mr: '1rem' }}/>
                        {user?.user ?
                            <Text styles={theme.text.styles.placeholder} sx={{ maxWidth: '10rem' }} className="header__user-name">{user.user.name || user.user.email}</Text>
                        : null}
                    </Flex>
                }>
                    {!user.status ?
                        <>
                            <Dropdown.Button onClick={() => changeLocation('/login', true)}>Войти</Dropdown.Button>
                        </>
                    : null}
                    <Dropdown.Button onClick={() => changeLocation('/register', true)}>Регистрация</Dropdown.Button>
                    {user.status ?
                        <>
                            <Dropdown.Button onClick={() => changeLocation('/admin')}>Личный кабинет</Dropdown.Button>
                            <Dropdown.Button onClick={() => changeLocation('/create')}>Создать историю</Dropdown.Button>
                            <Dropdown.Button onClick={() => changeLocation('/api/user/logout', true)}>Выход</Dropdown.Button>
                        </>
                    : null}
                </Dropdown>
            </Container.Header>
        </Container>
    )
}

export const Skeleton: React.FC<any> = () => (
    <Container sx={{ width: '100%' }}>
        <Container.Header sx={{ justifyContent: 'space-between' }} style={{ borderRadius: '0' }}>
            <UISkeleton width="15rem" height="2rem" />
            <UISkeleton width="3rem" height="3rem" style={{ borderRadius: '50%' }} />
        </Container.Header>
    </Container>
)

export default Component
