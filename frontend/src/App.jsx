import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import Account from "./components/Account";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from '@mui/material';

function App() {
  return (
    <div>
      <Box sx={{ minHeight: "98vh" }}>
        <Router>
          <Header />{/*Header component containig MUI AppBar component that allows user to navigate to different pages */}
          <Routes>
            <Route exact path="/" element={<SearchPage />} />
            <Route path="/account" element={<Account />} />
          </Routes>{/*Contians Route components that are navigated to depending on URL*/}
        </Router>{/*Router that navigates to different pages of web app */}
      </Box>{/*Container with Router component as child, style puts Footer at bottom of page */}
      <Footer /> {/*Footer at bottom of page containing details like copyright */}
    </div>
  );
}

export default App;
