import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageOfTasks from "./components/pageOfTasks/PageOfTasks";
import Login from "./components/AvtorizationPage/Login";
import Register from "./components/AvtorizationPage/Register";

function App() {
  return (<div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/tasks' element={<PageOfTasks />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/*' element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}
export default App;
