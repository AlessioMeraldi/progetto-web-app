// Style imports
import style from '/src/compoundViews (views)/SingleElementWrappers/SingleElements.module.css';

// React imports
import { useEffect } from 'react';

// Routing imports
import {useParams, Navigate, NavLink} from 'react-router-dom';

// Component imports
import ShowSingleCharacter from '/src/simpleViews (components)/SingleElementContent/ShowSingleCharacter.jsx';

// Begin logic
function SingleCharacter() {

    // Get parameter
    let {idNumber} = useParams();
    const maxId = 1182; // doing characterId > 1182 directly caused an error with type conversion

    // Scroll back to top (in case character is being shown from clicking far down the same or another page)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [idNumber]); // dependency on the parameter

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
    if (characterId > maxId) {
        return (<Navigate to='/404' replace/>);
    }

    console.log(characterId);

    return (
        <main className={style.pageContainer}>
            {
                /* conditional rendering of the {condition && <thing to render>} type */
                (characterId>1)
                &&
                <NavLink to={`/character/${characterId - 1}`} className={`${style.navBtn} ${style.prevBtn}`}>
                    PREVIOUS
                </NavLink>
            }
            <ShowSingleCharacter charId={characterId} imgSize="500"/>
            {
                (characterId<maxId)
                &&
                <NavLink to={`/character/${characterId + 1}`} className={`${style.navBtn} ${style.nextBtn}`}>
                    NEXT
                </NavLink>
            }
        </main>
    )

}

export default SingleCharacter;