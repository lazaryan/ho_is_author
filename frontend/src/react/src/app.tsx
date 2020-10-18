import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { ThemeProvider  } from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Flex, Box } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'
import Header, { Skeleton as HeaderSkeleton } from './header'

import theme from 'theme'

import { getState } from './actions/main'

export const App: React.FC<any> = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<Boolean>(false)

    React.useEffect(() => {
        dispatch(getState())
            .then(() => {
                setLoading(true)
            })
            .catch((error) => {
                toast.error('Ошибка загрузки данных. Поаторите попытку позже!')
                console.error(error)
            })
    }, [])

    return (
        <Flex width="100%" alignItems="center" flexDirection="column" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                limit={5}
            />
            {!loading ? <Skeleton /> :
            <BrowserRouter basename="/">
                <Route path="" render={({ location }) =>
                    <>
                        <Header />
                        <Box width="80%">
                            <Switch location={location}>
                            </Switch>
                        </Box>
                    </>
                }></Route>
            </BrowserRouter>}
        </Flex>
    )
}

export const Skeleton: React.FC = () => (
    <Flex width="100%" alignItems="center" flexDirection="column" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
        <HeaderSkeleton />
    </Flex>
)

export const Component: React.FC = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
