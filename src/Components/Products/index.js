import { useEffect, useState } from "react";
import { getAllProducts } from "../../API";
import { Card, List, Image, Typography } from "antd";

const Products = () => {
  const [items, setItems] = useState([]);
  // айтем это то что у нас приходит выдуманное название ,можно было написать и продакс это все равно что продакс сет продактс

  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Card
              title={product.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={product.thumbnail} />
              } // картинки сами
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
                  <Typography.Paragraph>
                    {" "}
                    {product.description}{" "}
                  </Typography.Paragraph>
                }
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};

export default Products;
