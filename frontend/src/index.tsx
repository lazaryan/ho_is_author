import 'assets/styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import applyInterceptors from 'backend/interceptors';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorsContainer from 'components/ErrorsContainer';
import rootReducer, { initialState } from 'reducers';

import App from './App';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export let rootElement: HTMLElement | null = null;
export const rootElementId = 'hoIsAuthorApp';
export const rootElementClass = `hoIsAuthor`;

const runApp = () => {
  rootElement = document.getElementById(rootElementId);

  applyInterceptors();

  if (rootElement) {
    rootElement.classList.add(rootElementClass);

    ReactDOM.render(
      <ErrorBoundary contentId="HO_IS_AUTHOR_APP">
        <Provider store={store}>
          <BrowserRouter basename="/">
            <App />
          </BrowserRouter>
          <ErrorsContainer />
        </Provider>
      </ErrorBoundary>,
      rootElement
    )
  } else {
    console.error(`element <... id="${rootElementId}" /> not found!`);
  } 
}

runApp();
