import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import AppRouter from "./components/AppRouter/AppRouter";


function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
