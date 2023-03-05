import React from 'react';
import ReactDOM from 'react-dom/client';
import './font.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './store/config';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
                <App />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);