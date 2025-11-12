import "./App.css";
import DebounceSearchDemo from "./components/DebounceSearchDemo";
import PaginationDemo from "./components/PaginationDemo";

function App () {
  
  return (
    <>
      <h1>Custom Hooks</h1>
      <hr />

      <PaginationDemo />
      <DebounceSearchDemo /> 

          
    </>
  );
}

export default App;