
import "./AppLayout.css";
import { Input, Menu } from "antd";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import LogoImage from "assets/logo.png";

function AppLayout({ children }){
    return (
        <div className="app">
            <div className="header"> 
                <h1 className="page-title">
                    <img src={LogoImage} alt="logo"/>
                </h1>
                <div className="search"><Input.Search/></div>
                <div className="topnav">
                    <Menu mode="horizontal inline">
                        <Menu.Item>메뉴 1</Menu.Item>
                        <Menu.Item>메뉴 2</Menu.Item>
                        <Menu.Item>메뉴 3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="sidebar"> 
                <StoryList style={{ marginBottom: "1rem" }}/>
                <SuggestionList/>
            </div>
            <div className="contents">{ children } </div>
            <div className="footer"> 
                &copy; 2022. Zamoca
            </div>
        </div>
    )
}

export default AppLayout;