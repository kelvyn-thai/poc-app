import { Button, Menu } from "antd";
import React from "react";
import { useRoutesStore } from "zustand-store/routes";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

interface IProps {
  children: React.ReactNode | React.ReactElement | any;
}

const FakeAppPortalFrame: React.FC<IProps> = ({ children }) => {
  const { routes } = useRoutesStore();
  const [showSideBar, setShowSideBar] = React.useState(true);
  return (
    <div className={`${styles.app} ${showSideBar && styles.sidebarVisible}`}>
      {showSideBar && (
        <Menu mode="vertical">
          {routes.map(({ path }) => (
            <Menu.Item key={path}>
              <Link to={path}>{path}</Link>
            </Menu.Item>
          ))}
          <Menu.Item>
            <Link to="/modal-test">/modal-test</Link>
          </Menu.Item>
        </Menu>
      )}
      <Button
        className="fixed top-0 left-0 w-10 h-10 z-10"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setShowSideBar(!showSideBar)}
      />
      {children}
    </div>
  );
};

export default React.memo(FakeAppPortalFrame);
