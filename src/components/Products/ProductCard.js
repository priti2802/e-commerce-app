import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export const ProductCard = ({ product = {}, toggleCartModal = () => {} }) => {
  return (
    <div className="product-card" id="product-card">
      <Card
        hoverable
        style={{ width: 240 }}
        onClick={() => toggleCartModal(true, product)}
        cover={<img alt="example" src={product?.image || ""} />}
      >
        <Meta
          title={
            product?.name +
            " | " +
            product?.categoryName +
            " | " +
            parseFloat(product?.price).toFixed(2)
          }
          description={product?.description || ""}
        />
      </Card>
    </div>
  );
};
