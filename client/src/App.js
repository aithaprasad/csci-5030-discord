import "./App.css";
import Home from "./Home";
import { useEffect } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import { selectUser } from "./features/userSlice";
import { login, logout } from "./features/userSlice";
import { useSelector, useDispatch, useReducer } from "react-redux";
function App() {
  const [state, dispatchs] = useReducer(reducer, initialState);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      // the user is logged in
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    } else {
      // the user is logged out
      dispatch(logout());
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>scrumNcoke</p>
        <Home />
      </header>
    </div>
  );
}

export default App;
