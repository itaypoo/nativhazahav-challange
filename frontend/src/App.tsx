import React from 'react';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ResultsPage from "./pages/ResultsPage";
import './i18n'
import {useTranslation} from "react-i18next";
import AllDataPage from "./pages/AllDataPage";
function App() {
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();

    return (
      <>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,0,0" />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/results" element={<ResultsPage/>}/>
                <Route path="/past-data" element={<AllDataPage/>}/>
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
