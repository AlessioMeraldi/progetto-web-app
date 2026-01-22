
// Style imports
import style from './src/simpleViews (components)/SIngleElements.module.css';

// Routing imports
import {useParams, Navigate} from 'react-router-dom';

// Begin logic
function SingleCharacter() {

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

}

export default SingleCharacter;