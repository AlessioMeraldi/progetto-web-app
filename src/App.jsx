import './App.css'
import Header from "./simpleViews (components)/Header.jsx";
import Footer from "./simpleViews (components)/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// test imports
import charactersViewModel from '/src/viewModels/charactersViewModel.js'

function App() {

    const footerLinks = [
        { text: "Home", url: "/" },
        { text: "Characters", url: "/characters" },
        { text: "Locations", url: "/locations" }
    ];
    const courseName = "Università degli Studi di Milano Bicocca";
    const courseLink = "https://www.unimib.it/";

    // test variables
    const {
        getSingleCharacter,
        getCharacterBatch
    } = charactersViewModel();

    return (
        <Router>
            {/* L'Header deve stare dentro il Router per far funzionare i Link */}
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<h1>Benvenuti a Springfield!</h1>} />
                    <Route path="/characters" element={<h1>Personaggi</h1>} />
                    <Route path="/locations" element={<h1>Luoghi</h1>} />
                    <Route path="/profile" element={<h1>Profilo</h1>} />
                </Routes>
            </main>
            <Footer navItems={footerLinks} courseName={courseName} courseLink={courseLink} />
            <h2> Prove funzionamento Model </h2>
            <button onClick={() => getSingleCharacter()}> premi per vedere un character </button>
            <button onClick={() => getCharacterBatch()}> premi per vedere un batch di characters </button>
        </Router>
    )
}

export default App;