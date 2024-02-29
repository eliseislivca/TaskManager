import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageOfTasks from "./Components/pageOfTasks/PageOfTasks";
import Login from "./Components/AvtorizationPage/Login";
import Register from "./Components/AvtorizationPage/Register";

function App() {

    return (<div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageOfTasks />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
}

export default App;
