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
import Mypage from "./pages/Mypage";
import UnRegister from "./pages/UnRegister";
import CheckWriting from "./pages/CheckWriting";
import MyExerciseDiary from "./pages/MyExerciseDiary";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element ={<Main />} />
        <Route path="/login" element ={<Login />} />
        <Route path="/findID" element ={<FindID />} />
        <Route path="/findPW" element ={<FindPW />} />
        <Route path="/joinmembership" element ={<JoinMembership />} />
        <Route path="/board/:category/showtext/:post_id" element ={<ShowText />} />
        <Route path="/replacePW" element ={<ReplacePW />} />
        <Route path="/board/:category/writeboard" element ={<WriteBoard />} />
        <Route path="/searchfitnesscenter" element ={<SearchFitnessCenter />} />
        <Route path="/board/:category" element ={<Board />} />
        <Route path="/mypage" element ={<Mypage />} />
        <Route path="/unregister" element ={<UnRegister />} />
        <Route path="/checkwriting" element ={<CheckWriting />} />
        <Route path="/myexercisediary" element ={<MyExerciseDiary />} />
      </Routes>
    </div>
  );
}

export default App;
