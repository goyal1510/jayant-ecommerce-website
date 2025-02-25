import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import 'remixicon/fonts/remixicon.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

// Create a root for rendering React components into the DOM element with the ID 'root'.
createRoot(document.getElementById('root')).render(
  // Wrap the application with the Redux Provider to make the store available to all components.
  <Provider store={store}>
    {/* Use RouterProvider to provide the router configuration to the application. */}
    <RouterProvider router={router} />
  </Provider>
);