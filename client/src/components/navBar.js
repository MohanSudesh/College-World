import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Header } = Layout;

function NavBar() {
  return (
    <Link to="/">
      <Layout>
        <Header
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "large",
            textAlign: "center",
            fontFamily: "cursive",
          }}
        >
          College World
        </Header>
      </Layout>
    </Link>
  );
}

export default NavBar;
