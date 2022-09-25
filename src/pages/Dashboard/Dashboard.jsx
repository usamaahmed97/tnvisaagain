import React, { useContext } from "react";
import "./dashboard.css";
import { Auth } from "aws-amplify";
import { Col, Row, Layout, Button, Dropdown, Menu, Space, message } from "antd";
import { LogoutOutlined, TranslationOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../../constants/pageRoutes";
import LocalizedStrings from "react-localization";
import { translation } from "../../localization/translation";
import AuthContext from "../../context/AuthContext";
import {
  ENGLISH_LANGUAGE,
  SPANISH_LANGUAGE,
} from "../../localization/languageConstants";
import { ENGLISH_KEY, SPANISH_KEY } from "../../localization/languageKeys";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
const Dashboard = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  let strings = new LocalizedStrings(translation);
  strings.setLanguage(authContext.appLanguage);

  const logout = async (e) => {
    e.preventDefault();
    try {
      await Auth.signOut();
      authContext.logoutStateHandler();
      localStorage.removeItem("loginState");
      navigate(SIGNIN);
    } catch (error) {
      authContext.loginStateHandler();
      localStorage.setItem("loginState", authContext.loginState);
      throw Error(error);
    }
  };

  const selectLanguage = ({ key }) => {
    if (key === ENGLISH_KEY) {
      authContext.setLanguageToEnglish();
      message.info(ENGLISH_LANGUAGE);
    } else if (key === SPANISH_KEY) {
      authContext.setLanguageToSpanish();
      message.info(SPANISH_LANGUAGE);
    }
  };

  const languageMenu = (
    <Menu
      onClick={selectLanguage}
      items={[
        {
          key: ENGLISH_KEY,
          label: "English",
        },
        {
          key: SPANISH_KEY,
          label: "Espanyol",
        },
      ]}
    />
  );

  const checkToken = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const JWT = authUser.signInUserSession.accessToken;
    console.log("Token Value after signing in", JWT);
  };

  return (
    <Layout>
      <Sider className="sidebar-container">
        <div className="sidebar">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "images/logo.png"}
          />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="nav-container">
          <Row className="nav-content">
            <Col offset={3} />
            <Col span={6}></Col>
            <Col offset={3} />
            <Col span={6}>
              <div className="nav-right-container">
                <Dropdown overlay={languageMenu} placement="bottom">
                  <Button className="language-translate-button">
                    <TranslationOutlined />
                  </Button>
                </Dropdown>

                <Button className="logout" type="primary" onClick={logout}>
                  <LogoutOutlined /> {strings.logout}
                </Button>
              </div>
            </Col>
          </Row>
          <h1>{strings.how}</h1>
          <button onClick={checkToken}>Check Token on console</button>
        </Header>

        <Content></Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
