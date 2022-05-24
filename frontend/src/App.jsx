import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Search from "./components/Search";
import Account from "./components/Account";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
