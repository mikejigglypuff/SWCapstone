import Header from "./components/header";
import JoinMembership from "./pages/JoinMembership";
import Main from "./pages/Main";
import Login from "./pages/Login";
import FindID from "./pages/findID";
import FindPW from "./pages/findPW";
import ShowText from "./pages/ShowText";
import ReplacePW from "./pages/ReplacePW";
import WriteBoard from "./pages/WriteBoard";
import SearchFitnessCenter from "./pages/SearchFitnessCenter";
import Board from "./pages/Board";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element ={<Main />} />
        <Route path="/login" element ={<Login />} />
        <Route path="/findID" element ={<FindID />} />
        <Route path="/findPW" element ={<FindPW />} />
        <Route path="/joinmembership" element ={<JoinMembership />} />
        <Route path="/showtext" element ={<ShowText />} />
        <Route path="/replacePW" element ={<ReplacePW />} />
        <Route path="/writeboard" element ={<WriteBoard />} />
        <Route path="/searchfitnesscenter" element ={<SearchFitnessCenter />} />
        <Route path="/board/:category" element ={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
