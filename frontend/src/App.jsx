import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import MustWatchListPage from "./components/MustWatchListPage";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/mustwatchlist" element={<MustWatchListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
