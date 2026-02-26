// Style imports
import style from '/src/compoundViews (views)/SingleElementWrappers/SingleElements.module.css';

// React imports
import {useEffect} from 'react';

// Routing imports
import {useParams, Navigate, NavLink} from 'react-router-dom';

// Component imports
import ShowSingleLocation from '/src/simpleViews (components)/SingleElementContent/ShowSingleLocation.jsx';

// Begin logic
function SingleLocation() {

    // Get parameter
    let {idNumber} = useParams();
    const maxId = 477; // doing characterId > 447 directly caused an error with type conversion

    // Scroll back to top (in case character is being shown from clicking far down the same or another page)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [idNumber]); // dependency on the parameter

    // Loathsome Regex, source of all evil, to check if the passed parameter :idNumber is a number
    if (!/^\d+$/.test(idNumber)) {
        return (<Navigate to='/404' replace/>);
    }

    const locationId = parseInt(idNumber);

    // checks for number validity - number too small
    if (locationId < 1) {
        return (<Navigate to='/404' replace/>);
    }

    // check for number validity - number too big
    if (locationId > maxId) {
        return (<Navigate to='/404' replace/>);
    }

    console.log(locationId);

    return (
        <main className={style.pageContainer}>
            {
                /* conditional rendering of the {condition && <thing to render>} type */
                (locationId > 1)
                &&
                <NavLink to={`/location/${locationId - 1}`} className={`${style.navBtn} ${style.prevBtn}`}>
                    PREVIOUS
                </NavLink>
            }
            <ShowSingleLocation locId={locationId} imgSize="500"/>
            {
                (locationId < maxId)
                &&
                <NavLink to={`/location/${locationId + 1}`} className={`${style.navBtn} ${style.nextBtn}`}>
                    NEXT
                </NavLink>
            }
        </main>
    )

}

export default SingleLocation;
