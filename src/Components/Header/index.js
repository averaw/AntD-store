import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
      onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeOutlined />,
            key: ""
          },
          {
            label: "Store",
            key: "store",
            children: [
              { label: "All", key: "all" },
              { label: "Hoodie", key: "hoodie" },
              { label: "Sports trousers", key: "sports-trousers" },
              { label: "Dresses", key: "dresses" }
            ]
          },
          {
            label: "About",
            key: "about"
          }
        ]}
      />
    </div>
  );
}
export default AppHeader;
