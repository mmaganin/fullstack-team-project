import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import MustWatchListPage from "./components/MustWatchListPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from '@mui/material';

function App() {
  return (
    <div>
      <Box sx={{ minHeight: "920px" }}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<SearchPage />} />
            <Route path="/mustwatchlist" element={<MustWatchListPage />} />
          </Routes>
        </Router>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
