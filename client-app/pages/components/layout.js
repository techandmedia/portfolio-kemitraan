import Head from "next/head";
import Link from "next/link";

import "../asserts/styles.less";
import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <style jsx global>{`
      body {
      }
    `}</style>
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        // theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link href="/about">About</Link></Menu.Item>
        <Menu.Item key="3"><Link href="/table1">Table 1</Link></Menu.Item>
        <Menu.Item key="4"><Link href="/table2">Table 2</Link></Menu.Item>
        <Menu.Item key="5"><Link href="/table3">Table 3</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
    {/* {children} */}
  </div>
);
