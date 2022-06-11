import AppLayout from "components/AppLayout";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Login from "./accounts/login";
import Profile from "./accounts/profile";
import Signup from "./accounts/Signup";


function Root() {
    return (
       <AppLayout>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="accounts">
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
           </Routes>
       </AppLayout>
    )
}

export default Root;