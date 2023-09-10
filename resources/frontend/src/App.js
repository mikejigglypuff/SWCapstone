import Header from "./components/header";
import IDPWHeader from "./components/IDPWHeader";
import Main from "./pages/Main";
import FindID from "./pages/findID";
import FindPW from "./pages/findPW";

function App() {
  return (
    
    <div className="App">
      <Header />
      <Main />
    </div>
    

    /*
    <div className="findID">
      <IDPWHeader />
      <FindID />
    </div>
    */

    /*
    <div className="findPW">
      <IDPWHeader />
      <FindPW />
    </div>
    */
  );
}

export default App;
