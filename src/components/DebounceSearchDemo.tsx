import { useState } from "react";
import useDebounce from "../assets/hooks/useDebounce";


function DebounceSearchDemo(){
    const [searchTerm, setSearchTerm] = useState('');
    const [delay, setDelay] = useState(500);

    const debounceValue = useDebounce(searchTerm, delay);


    return(
        <div>
            <h3>Debounce Search Demo</h3>

            <label>Debounce Delay (ms):</label>

            <input type="number" value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            />

            <br />            
            <input type="text" placeholder="Type to search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
        <div>
            <p>Current Input:{searchTerm || ""}</p>

            <strong>Debounced Value(after 500ms):{debounceValue || ""}</strong>
            </div>
        <div>
            <h4>Simulated Search Results:</h4>
            {debounceValue && <em>Showing results for "{debounceValue}"</em>}
            <div>Type to see results.</div>
        </div>
        </div>
    );
}
export default DebounceSearchDemo;