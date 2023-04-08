import { SnackbarProvider } from "notistack";
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { useState, useContext, createContext } from "react";
import Checkout from "./components/Checkout";
import Thanks from './components/Thanks.js'

// export const CartDataContext = createContext();

export const config = {
  endpoint: "http://" + ipConfig.workspaceIp + ":8082/api/v1",
  //endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1/auth/register`,
  // import Register from "./components/Register";
  // import ipConfig from "./ipConfig.json";
};

// export const config = {
//   endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
// };

function App() {
  // let [cartData, setCartData] = useState([]);
  return (
    // <CartDataContext.Provider value={{cartData,setCartData}}>
      <Router>
        <div className="App">
          <SnackbarProvider>
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Products />
              </Route>
              <Route exact path="/checkout">
                <Checkout />
              </Route>
              <Route exact path='/thanks'>
                <Thanks/>
              </Route>
            </Switch>
          </SnackbarProvider>
          {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
        </div>
      </Router>
    // </CartDataContext.Provider>
  );
}

export default App;
