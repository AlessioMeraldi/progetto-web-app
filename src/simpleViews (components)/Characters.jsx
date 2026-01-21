
// Style imports
import styles from "/src/simpleViews (components)/Characters.module.css"

// React imports
import {useEffect} from "react";

//  ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js'

// Begin logic
function Characters () {

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        allCharacters,
        getAllCharacters,
    } = CharactersViewModel();

    // tell the ViewModel to update its state regarding [allCharacters]
    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <div>

            {/* toDo: filters section */}
            <section>
                <p> I filtri andranno qui </p>
            </section>

            {/* Characters grid */}
            <main>
                {allCharacters?.map((character, index) => ( // toDo: clarify the ?
                    <div key={character.id || index}> {/* attempt to use character's ID and fallback to index if something goes wrong */}
                        <p> {character?.name} </p> {/* toDo: clarify the ?*/}
                    </div>
                ))}
            </main>

        </div>
    )

}

export default Characters;