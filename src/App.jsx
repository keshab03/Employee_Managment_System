import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup'
import AddDetails from './Components/AddDetails/Details';
import Welcome from './Components/Welcome/Welcome';
import Edit from './Components/Edit/Edit';
import Footer from './Components/Footer/Footer';
import HrSignup from './Components/Hrsignup/HrSignup';
import HrLogin from './Components/HrLogin/HrLogin';
import SeeAllDetails from './Components/SeeAllDetails/SeeAllDetails';
import AddTeam from './Components/AddTeam/AddTeam';
import SeeTeam from './Components/SeeTeam/SeeTeam';
import EditTeam from './Components/EditTeam/EditTeam';
import EmpTeams from './Components/EmpTeams/EmpTeams';


const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/details' element={<AddDetails />}></Route>
          <Route path='/edit/:index' element={<Edit />}></Route>
          <Route path='/hrsignup' element={<HrSignup />}></Route>
          <Route path='/hrlogin' element={<HrLogin />}></Route>
          <Route path='/seealldetails' element={<SeeAllDetails />}></Route>
          <Route path='/addteam/:index' element={<AddTeam />}></Route>
          <Route path='/seeteam/:index' element={<SeeTeam />}></Route>
          <Route path='/editteam/:id/:index' element={<EditTeam />}></Route>
          <Route path='/empteams/:id' element={<EmpTeams />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
