import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'
import App from './App.jsx'

//Find the <div id='root'> in index.html and render the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*Provider makes the Redux store available to any nested components that need to access the Redux store.*/}
    <Provider store={store}>
      <BrowserRouter>
      {/*BrowserRouter enables URL-based navigation */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
