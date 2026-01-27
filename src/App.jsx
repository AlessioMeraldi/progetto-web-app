// Style imports
import './App.css'

// React imports
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// ViewModels imports (toDo: delete after testing is finished)
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js'
import LocationsViewModel from "./viewModels/LocationsViewModel.js";

// View imports
import Header from "./simpleViews (components)/Header & Footer/Header.jsx";
import Footer from "./simpleViews (components)/Header & Footer/Footer.jsx";
import Page_404 from "./simpleViews (components)/Error pages/Page_404.jsx";
import Home from "./simpleViews (components)/Home.jsx";
import Characters from "./compoundViews (views)/MultipleElementsWrappers/Characters.jsx";
import Locations from "./compoundViews (views)/MultipleElementsWrappers/Locations.jsx";
import Profile from "./simpleViews (components)/ProfileComponents/Profile.jsx";
import SingleCharacter from "./compoundViews (views)/SingleElementWrappers/SingleCharacter.jsx";
import SingleLocation from "./compoundViews (views)/SingleElementWrappers/SingleLocation.jsx";
import Access_forbidden from "./simpleViews (components)/Error pages/Access_forbidden.jsx";
import ProtectedRoute from "./simpleViews (components)/Auth0/ProtectedRoute.jsx";

// Begin logic
function App() {

    const footerLinks = [
        {text: "Home", url: "/"},
        {text: "Characters", url: "/characters"},
        {text: "Locations", url: "/locations"}
    ];
    const courseName = "Università degli Studi di Milano Bicocca";
    const courseLink = "https://www.unimib.it/";

    // viewModel functions (toDo: delete upon having finished testing)
    const {
        getSingleCharacter,
        getCharacterBatch,
        getAllCharacters,
    } = CharactersViewModel();

    // viewModel functions (toDo: delete upon having finished testing)
    const {
        getSingleLocation,
        getLocationsBatch,
        getAllLocations
    } = LocationsViewModel();

    return (
        <Router>
            <div className="app">
                {/* L'Header deve stare dentro il Router per far funzionare i Link */}
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/characters" element={<Characters/>}/>
                        <Route path="/character/:idNumber" element={<SingleCharacter/>}/>

                        <Route
                            path="/locations"
                            element={
                                <ProtectedRoute>
                                    <Locations />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/location/:idNumber"
                            element={
                                <ProtectedRoute>
                                    <SingleLocation />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/access_forbidden" element={<Access_forbidden/>}/>
                        <Route path="*" element={<Page_404/>}/>
                    </Routes>
                </main>
                <Footer navItems={footerLinks} courseName={courseName} courseLink={courseLink}/>

                {/* toDo: delete content after this part */}
                <h2> Prove funzionamento Model dei personaggi </h2>
                <button onClick={() => getSingleCharacter(1, 200)}> premi per vedere un character</button>
                <button onClick={() => getCharacterBatch(1)}> premi per vedere un batch di characters</button>
                <button onClick={() => getAllCharacters()}> premi per vedere tutti i characters</button>
                <h2> Prove di funzionamento Model delle locations </h2>
                <button onClick={() => getSingleLocation(1, 200)}> premi per vedere una location</button>
                <button onClick={() => getLocationsBatch(1)}> premi per vedere un batch di locations</button>
                <button onClick={() => getAllLocations()}> premi per vedere tutte le locations</button>
                {/* toDo: delete end */}

            </div>
        </Router>
    )
}

export default App;