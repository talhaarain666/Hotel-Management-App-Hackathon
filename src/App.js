import logo from './logo.svg';
import './App.css';
import AppRouting from './config/router/routing';
import { Provider } from 'react-redux';
import store from './config/redux/store';

function App() {
  return (
  <Provider store={store}>
      <AppRouting />
  </Provider>
   
  );
}

export default App;
