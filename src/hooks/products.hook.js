import { useEffect, useState } from "react";
import { addToCart, getCartProducts, getProducts } from "../apis/products.api";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";

export const useProductsHook = () => {
  const [products, setProducts] = useState();
  const [carts, setCarts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({
    skip: 0,
    limit: 10,
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedCartData, setSelectedCartData] = useState({});
  const [cartModalData, setCartModalData] = useState({});

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      // localStorage.setItem("userId", uuid());
    }
  }, [userId]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const productsRes = await getProducts(paginationData);
      setProducts(productsRes?.responseData || []);

      setPaginationData({
        ...paginationData,
        skip: paginationData.skip + productsRes?.responseData?.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCartProducts = async () => {
    try {
      setIsLoading(true);

      const cartRes = await getCartProducts();
      setCarts(cartRes?.responseData || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCartModal = (isOpen, cartData = {}) => {
    setSelectedCartData({ ...cartData });
    setIsCartModalOpen(isOpen);

    if (isOpen) {
      fetchCartProducts()
    }
  };

  const onQtyChange = (eventValue) => {
    setCartModalData({
      ...cartModalData,
      qty: eventValue,
    });
  };

  const handleAddToCart = async () => {
    try {
      const qty = cartModalData?.qty || 1;
      const cartPayload = {
        productId: selectedCartData?.id,
        quantity: qty,
        totalPrice: parseFloat(selectedCartData?.price * qty),
        userId: localStorage.getItem("userId") || uuid(),
      };

      const cartRes = await addToCart(cartPayload);
      toast.success("Product added to cart..");

      toggleCartModal(false, {});
    } catch (error) {
      toast.error("Error while adding product to cart");
    }
  };

  return {
    products,
    carts,
    isLoading,
    isCartModalOpen,
    cartModalData,
    onQtyChange,
    toggleCartModal,
    handleAddToCart,
  };
};
