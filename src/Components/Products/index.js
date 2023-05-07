import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin
} from "antd";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Products = () => {
  const [items, setItems] = useState([]);
  const param = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);
  if (loading) {
    return <Spin spinning />;
  }

  function AddToCartButton({ item }) {
    const addProductToCart = () => {
      addToCart(item.id).then((res) => {
        message.success(`${item.title} has been added to cart!`);
      });
    };
    return (
      <Button
        type="link"
        onClick={() => {
          addProductToCart();
        }}
      >
        Add to Cart
      </Button>
    );
  }
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={product.discountPercentage}
              color="cyan"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={[
                  <div key="actions">
                    <Rate allowHalf disabled value={product.rating} />
                    <AddToCartButton item={product} />
                  </div>
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: {product.price} ${" "}
                      <Typography.Text>
                        {" "}
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {" "}
                      {product.description}{" "}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};

Products.propTypes = {
  item: PropTypes.object
};

export default Products;
