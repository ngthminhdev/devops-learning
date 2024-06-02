import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import SignUpPage from "./register";

const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={SignUpPage} />
        </Routes>
    </Router>
  );
};

export default App;