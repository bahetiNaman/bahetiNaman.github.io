import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";
const Homepage = () => {
    const [allNotes, setAllNotes] = useState([]);
    const theme = useContext(ThemeContext);
    console.log(useContext(ThemeContext));
    useEffect(() => {
        setAllNotes(JSON.parse(localStorage.getItem("notes")));
        return function addAllNotes() {
            localStorage.setItem("notes", JSON.stringify(allNotes));
        }
    }, []);
    return (
        <div className='App' style={{ background: theme.background, color: theme.foreground, flex: '0.8', minWidth: '100%' }}>
            <div className="notes-grid">
                
            </div>
            <div className="add-button">
                <button></button>
            </div>
        </div>
    );
}
export default Homepage;