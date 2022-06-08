import AppLayout from "components/AppLayout";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Login from "./accounts/login";
import Profile from "./accounts/profile";


function Root() {
    return (
       <AppLayout>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="accounts">
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
            </Route>
           </Routes>
       </AppLayout>
    )
}

export default Root;