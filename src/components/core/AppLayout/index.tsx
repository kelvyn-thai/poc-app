import { Layout, Menu } from "antd";
import React from "react";
import { useRoutesStore } from "zustand-store/routes";
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ErrorBoundary from "components/core/ErrorBoundary";
import { Link, useLocation } from "react-router-dom";
import { capitalize } from "lodash";
import { ItemType } from "rc-menu/lib/interface";
import EnvisionLogo from "components/icons/EnvisionLogo";
import "./AppLayout.style.scss";

const { Header, Sider, Content } = Layout;

interface IProps {
  children: React.ReactNode | React.ReactElement | any;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const { routes } = useRoutesStore();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const menuItems = React.useMemo(
    (): ItemType[] =>
      routes
        .filter((r) => r.path !== "/")
        .map(({ path }) => {
          let label = path;
          try {
            label = path
              .split("/")[1]
              .split("-")
              .map((w) => capitalize(w))
              .join(" ");
          } catch (error) {
            //
          }
          return {
            key: path,
            icon: <ContainerOutlined />,
            label: <Link to={path}>{label}</Link>,
          };
        }),
    [routes, location]
  );
  const CollapsIcon = React.useMemo(
    () => (collapsed ? MenuUnfoldOutlined : MenuFoldOutlined),
    [collapsed]
  );
  return (
    <Layout className="app-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background flex justify-between">
          <CollapsIcon
            onClick={() => setCollapsed(!collapsed)}
            className="antd-menu-fold"
          />
          <Link to="/" className="w-32 h-8">
            <EnvisionLogo />
          </Link>
        </Header>
        <Content className="site-layout-background bg-primary-200">
          <ErrorBoundary>
            <div className="layout-content">{children}</div>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(AppLayout);
