// Style imports
import style from '/src/compoundViews (views)/SingleElements.module.css';

// Routing imports
import {useParams, Navigate, NavLink} from 'react-router-dom';

// Component imports
import ShowSingleCharacter from '/src/simpleViews (components)/ShowSingleCharacter.jsx';

// Begin logic
function SingleCharacter() {

    // Get parameter
    let {idNumber} = useParams();

    // Loathsome Regex, source of all evil, to check if the passed parameter :idNumber is a number
    if (!/^\d+$/.test(idNumber)) {
        return (<Navigate to='/404' replace/>);
    }

    const characterId = parseInt(idNumber);

    // checks for number validity - number too small
    if (characterId < 1) {
        return (<Navigate to='/404' replace/>);
    }

    // check for number validity - number too big
    if (characterId > 1182) {
        return (<Navigate to='/404' replace/>);
    }

    console.log(characterId);

    return (
        <main className={style.pageContainer}>
            {
                /* conditional rendering of the {condition && <thing to render>} type */
                (characterId>1)
                &&
                <NavLink to={`/character/${characterId - 1}`}>
                    Previous
                </NavLink>
            }
            <ShowSingleCharacter charId={characterId} imgSize="500"/>
            {
                (characterId<1182)
                &&
                <NavLink to={`/character/${characterId + 1}`}>
                    Next
                </NavLink>
            }
        </main>
    )

}

export default SingleCharacter;