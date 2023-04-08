import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useHistory, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./Cart.css";
// import styled from "styled-components";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  let cartItems = [];
  // console.log(cartData);
  // console.log(productsData);
  // console.log('its in generate cart data');
  cartData.map((e) => {
    productsData.filter((prodEle) => {
      if (e.productId === prodEle._id && e.qty > 0) {
        cartItems.push({ ...prodEle, quantity: e.qty });
      }
    });
  });
  // console.log(cartItems);
  return cartItems;
  // console.log(cartData, productsData);

  // const productIds = cartData.map((item) => {
  //   return item.productId;
  // });
  // const filteredProducts = productsData.filter((item) => {
  //   return productIds.includes(item._id);
  // });
  // const cartItem = filteredProducts.map((ele, idx) => {
  //   return {
  //     name: ele.name,
  //     qty: cartData[idx].qty,
  //     category: ele.category,
  //     cost: ele.cost,
  //     rating: ele.rating,
  //     image: ele.image,
  //     productId: ele._id,
  //   };
  // });

  // console.log(cartItem)
  // return cartItem;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0;
  console.log(items);
  items.map((e) => {
    totalCost = totalCost + e.cost * e.quantity;
  });
  return totalCost;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */

// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  let totalProductsQuantity = 0;
  items.map((e) => {
    totalProductsQuantity = totalProductsQuantity + Number(e.quantity);
  });
  return totalProductsQuantity;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete, bool }) => {
  return (
    <>
      {!bool ? (
        <Stack direction="row" alignItems="center">
          <IconButton size="small" color="primary" onClick={handleDelete}>
            <RemoveOutlined />
          </IconButton>
          <Box padding="0.5rem" data-testid="item-qty">
            {value}
          </Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              handleAdd(value);
            }}
          >
            <AddOutlined />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center">
          Qty:
          <Box padding="0.5rem" data-testid="item-qty">
            {value}
          </Box>
        </Stack>
      )}
    </>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */

/**
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 **/
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  // const CardWrapper = styled.div`
  //   @media (max-width: 425px) {
  //     display:flex;
  //     flex-direction: row;
  //     min-height:30vh;
  //   }
  // `;

  let history = useHistory();
  console.log(products);
  console.log(items);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(generateCartItemsFrom(items, products));
  }, [items]);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      {!isReadOnly ? (
        <Box className="cart">
          {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
          <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="column">
              {cartItems.length > 0
                ? cartItems.map((e, i) => {
                    return (
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        padding="1rem"
                        key={i}
                      >
                        <Box className="image-container">
                          <img
                            // Add product image
                            src={`${e.image}`}
                            // Add product name as alt eext
                            alt={`${e.name}`}
                            width="100%"
                            height="100%"
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          height="6rem"
                          paddingX="1rem"
                        >
                          <div>{`${e.name}`}</div>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <ItemQuantity
                              // Add required props by checking implementation
                              key={i}
                              value={e.quantity}
                              handleAdd={() => {
                                handleQuantity(
                                  localStorage.getItem("token"),
                                  items,
                                  products,
                                  e._id,
                                  Number(e.quantity) + 1,
                                  { preventDuplicate: false }
                                );
                              }}
                              handleDelete={() => {
                                handleQuantity(
                                  localStorage.getItem("token"),
                                  items,
                                  products,
                                  e._id,
                                  Number(e.quantity) - 1,
                                  { preventDuplicate: false }
                                );
                              }}
                              bool={isReadOnly}
                            />
                            <Box padding="0.5rem" fontWeight="700">
                              ${`${e.cost}`}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
                : null}
              <Stack direction="row" justifyContent="flex-end">
                <Box color="#3C3C3C" alignSelf="center">
                  Order total &nbsp;
                </Box>
                <Box
                  color="#3C3C3C"
                  fontWeight="700"
                  fontSize="1.5rem"
                  alignSelf="center"
                  data-testid="cart-total"
                >
                  ${getTotalCartValue(cartItems)}
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => {
                history.push("/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="cart">
          {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
          <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="column">
              {cartItems.length > 0
                ? cartItems.map((e, i) => {
                    return (
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        padding="1rem"
                        key={i}
                        backgroundColor='white'
                      >
                        <Box className="image-container">
                          <img
                            // Add product image
                            src={`${e.image}`}
                            // Add product name as alt eext
                            alt={`${e.name}`}
                            width="100%"
                            height="100%"
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          height="6rem"
                          paddingX="1rem"
                        >
                          <div>{`${e.name}`}</div>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <ItemQuantity
                              // Add required props by checking implementation
                              key={i}
                              value={e.quantity}
                              handleAdd={() => {
                                handleQuantity(
                                  localStorage.getItem("token"),
                                  items,
                                  products,
                                  e._id,
                                  Number(e.quantity) + 1,
                                  { preventDuplicate: false }
                                );
                              }}
                              handleDelete={() => {
                                handleQuantity(
                                  localStorage.getItem("token"),
                                  items,
                                  products,
                                  e._id,
                                  Number(e.quantity) - 1,
                                  { preventDuplicate: false }
                                );
                              }}
                              bool={isReadOnly}
                            />
                            <Box padding="0.5rem" fontWeight="700">
                              ${`${e.cost}`}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
                : "hello"}
              <Stack direction="row" justifyContent="space-around" backgroundColor='white' mb={2}>
                <Box color="#3C3C3C" alignSelf="center">
                  Order total &nbsp;
                </Box>
                <Box
                  color="#3C3C3C"
                  fontWeight="700"
                  fontSize="1.5rem"
                  alignSelf="center"
                  data-testid="cart-total"
                >
                  ${getTotalCartValue(cartItems)}
                </Box>
              </Stack>
              <Box sx={{ backgroundColor: "white"}}>
                <Typography variant="h5" sx={{ fontWeight: "bold"}}>Order details</Typography>
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  my={2}
                >
                  <Typography variant="h6">Products</Typography>
                  <Typography variant="h6">
                    {getTotalItems(cartItems)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  my={2}
                >
                  <Typography variant="h6">Subtotal</Typography>
                  <Typography variant="h6">
                    ${getTotalCartValue(cartItems)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  my={2}
                >
                  <Typography variant="h6">Shipping Charges</Typography>
                  <Typography variant="h6">
                    $0
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold"}}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold"}}>
                    ${getTotalCartValue(cartItems)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
