import React from 'react';
import Wrapper from './UseComponents/Wrapper/Wrapper';
import Nav from './Nav/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './Pages/Pages';
import Footer from './Footer/Footer';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from "./Redux/Actions/auth";
import setAuthToken from './Utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Pages />
        </Wrapper>
      </Router>
    </Provider>
  );
};

export default App;
