import { InputNumber, Modal, Spin } from "antd";
import "./index.css";
import { ProductCard } from "../../components/Products/ProductCard";
import { useProductsHook } from "../../hooks/products.hook";

const Products = () => {
  const {
    products,
    carts,
    isLoading,
    isCartModalOpen,
    cartModalData,
    onQtyChange,
    toggleCartModal,
    handleAddToCart,
  } = useProductsHook();

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <Spin />
          Loading
        </div>
      ) : (
        <div className="products-listing">
          {products?.map((product, productIndex) => {
            return (
              <ProductCard
                product={product}
                key={`product-${productIndex}`}
                toggleCartModal={toggleCartModal}
              />
            );
          })}
          <Modal
            title="Add to cart modal"
            open={isCartModalOpen}
            onOk={handleAddToCart}
            onCancel={() => toggleCartModal(false, {})}
          >
            <InputNumber
              min={1}
              defaultValue={1}
              value={cartModalData.qty}
              onChange={onQtyChange}
            />
            {carts?.map((cart, cartIndex) => {
              return (
                <ProductCard
                  product={cart}
                  key={`product-${cartIndex}`}
                  toggleCartModal={toggleCartModal}
                />
              );
            })}
          </Modal>
        </div>
      )}
    </>
  );
};

export default Products;
