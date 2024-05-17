import './App.css';
import Appbar from "./components/Appbar";
import React, {useState} from "react";
import CRUDCity from "./components/City/CRUDCity";
import CRUDLanguage from "./components/Language/CRUDLanguage"
import CRUDCountry from "./components/Country/CRUDCountry";

function App() {

    const [numAction, setNumAction] = useState(null)

    const handleAction = (numAction) => {
        setNumAction(numAction);
    }

    return (
        <div className="App">
            <Appbar onAction = {handleAction}/>
            {/*{numAction === "CRUD_COUNTRY" && <CRUDCountry/>}*/}
            {numAction === "CRUD_CITY" && <CRUDCity/>}
            {/*{numAction === "CRUD_LANGUAGE" && <CRUDLanguage/>}*/}
        </div>
    )
}

export default App;
