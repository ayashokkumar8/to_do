import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import store from 'store/store';
import { UserContextProvider } from 'utils/UserContext'
import LayoutComponent from 'Layout';
import "./assets/scss/index.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <UserContextProvider>
      <Router>
        <LayoutComponent />
      </Router>
      </UserContextProvider>
      </Provider>
    </div>
  );
}

export default App;
