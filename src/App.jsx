// Style imports
import './App.css'

// React imports
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";

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
import Top5 from "./simpleViews (components)/Top5/Top5.jsx";

// Begin logic
function App() {

    const footerLinks = [
        {text: "Home", url: "/home"},
        {text: "Characters", url: "/characters"},
        {text: "Locations", url: "/locations"},
        {text: "Top 5", url: "/top5"}
    ];
    const courseName = "Università degli Studi di Milano Bicocca";
    const courseLink = "https://www.unimib.it/";

    return (

        <Router>
            <div className="app">
                {/* Header must stay inside the router for the links to work */}
                <Header/>
                <main>
                    <Routes>

                        {/* Redirect the root path to /home immediately - so it adds the .../#/... hashtag */}
                        {/* The problem was that on the first access on GH Pages it wouldn't display /#/ */}
                        <Route path="/" element={<Navigate replace to="/home"/>}/>

                        {/* Explicit home component (introduced it to avoid the homepage being ...app/#/ (nothing) */}
                        <Route path="/home" element={<Home/>}/>

                        <Route path="/characters" element={<Characters/>}/>
                        <Route path="/character/:idNumber" element={<SingleCharacter/>}/>

                        <Route
                            path="/locations"
                            element={
                                <ProtectedRoute>
                                    <Locations/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/location/:idNumber"
                            element={
                                <ProtectedRoute>
                                    <SingleLocation/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/top5" element={<Top5/>}/>
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/access_forbidden" element={<Access_forbidden/>}/>
                        <Route path="*" element={<Page_404/>}/>
                    </Routes>
                </main>
                <Footer navItems={footerLinks} courseName={courseName} courseLink={courseLink}/>
            </div>
        </Router>
    )
}

export default App;