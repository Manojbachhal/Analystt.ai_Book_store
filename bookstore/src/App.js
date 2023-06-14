import Home from "./Pages/Home";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Allroutes from "./Routing/Allroutes";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Allroutes />
    </div>
  );
}

export default App;
