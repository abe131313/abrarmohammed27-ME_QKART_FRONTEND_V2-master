import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart.js";
// import { CartDataContext } from "../App";


// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  // const {cartData,setCartData} = useContext(CartDataContext);
  let [cartData, setCartData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  let [theBool, SetTheBool] = useState();
  // let [cartData, setCartData] = useState([]);
  if (localStorage.getItem("username") !== null) {
    theBool = true;
  } else {
    theBool = false;
  }

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  // let Load = (props) => {
  //   let api = props.api;
  //   if (api === 1) {
  //     return (
  //       <Box sx={{ display: "flex", justifyContent: "center" }}>
  //         <Stack>
  //           <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
  //             <CircularProgress />
  //           </Box>
  //           Loading Products...
  //         </Stack>
  //       </Box>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const NoProductsFound = () => {
  //   if(data === null){
  //     return(
  //       <Box>
  //         <SentimentDissatisfied/>
  //       </Box>
  //     )
  //   }
  // }
  // const ProductRender = (props) => {
  //   let data = props.data;
  //   if (data === null) {
  //     return (
  //       <Box sx={{ display: "flex", justifyContent: "center" }}>
  //         <Stack>
  //           <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
  //             <SentimentDissatisfied />
  //           </Box>
  //           <h3>No Products found</h3>
  //         </Stack>
  //       </Box>
  //     );
  //   }
  //   if (data !== undefined) {
  //     return (
  //       <Grid
  //         container
  //         spacing={{ xs: 2, md: 2 }}
  //         columns={{ xs: 4, sm: 8, md: 12 }}
  //       >
  //         {data.map(itemLoopFunc)}
  //       </Grid>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const handleAddToCart = (productId) => {
  //   if (localStorage.getItem("username") == null) {
  //     enqueueSnackbar("Login to add an item to the Cart", {
  //       variant: "warning",
  //     });
  //   } else {
  //     console.log(cartData);
  //     console.log(productId);
  //     console.log(isItemInCart(cartData, productId));
  //   }
  // };

  // const itemLoopFunc = (item, index) => {
  //   return (
  //     <Grid item xs={2} sm={4} md={3} key={index}>
  //       <ProductCard product={item} handleAddToCart={handleAddToCart} />
  //     </Grid>
  //   );
  // };

  let [api, setApi] = useState();
  let [status, setStatus] = useState(0);
  let [data, setData] = useState([]);
  // let [direction,setDirection] = useState("row");
  // let direction = "row";

  // const mediaQuery = window.matchMedia("(max-width : 992px)");
  // if (mediaQuery.matches) {
  //   // setDirection("column");
  //   direction = "column";
  //   // console.log(2)
  // } else {
  //   direction = "row";
  //   // console.log(1);
  //   // setDirection("row");
  // }

  const performAPICall = async () => {
    try {
      setApi(true);
      let response = await axios.get(`${config.endpoint}/products`);
      setData(response.data);
      setStatus(response.status);
      setApi(false);
    } catch (e) {
      console.log(e);
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const searchData = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setData(searchData.data);
      setStatus(0);
      // console.log(response.data);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      if (e.response.status === 404) {
        setStatus(404);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  let [timerout, setTimerout] = useState();
  const debounceSearch = (event, debounceTimeout) => {
    // if(timerout){
    //   //clear wala part here
    // }
    clearTimeout(timerout);
    setTimerout(
      setTimeout(() => {
        performSearch(event.target.value);
      }, debounceTimeout)
    );
  };

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      let response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setCartData(
        response.data.filter((e) => {
          if (Number(e.qty) > 0) {
            return e;
          }
        })
      );
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  useEffect(() => {
    performAPICall();
    fetchCart(window.localStorage.getItem("token"));
  }, []);

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    let isPresent;
    items.map((e) => {
      if (e.productId === productId) {
        console.log("condition satisfied");
        isPresent = true;
      }
    });
    if (isPresent === undefined) {
      isPresent = false;
    }
    return isPresent;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (qty < 1) {
      let response = await axios.post(
        `${config.endpoint}/cart`,
        {
          productId: productId,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        }
      );
      let copyOfStateArrCartData = [...cartData];
      copyOfStateArrCartData.map((e, i) => {
        let index = copyOfStateArrCartData.indexOf(e);
        if (e.productId === productId) {
          copyOfStateArrCartData.splice(index, 1);
        }
      });
      setCartData(copyOfStateArrCartData);
    } else if (!options.preventDuplicate) {
      let response = await axios.post(
        `${config.endpoint}/cart`,
        {
          productId: productId,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        }
      );
      cartData.map((e, i) => {
        if (e.productId === productId) {
          let index = cartData.indexOf(e);
          let copyOfStateArrCartData = [...cartData];
          copyOfStateArrCartData.splice(index, 1, {
            productId: productId,
            qty: qty,
          });
          setCartData(copyOfStateArrCartData);
        }
      });
    } else {
      if (localStorage.getItem("username") === null) {
        enqueueSnackbar("Login to add an item to the Cart", {
          variant: "warning",
        });
      } else {
        let bool = isItemInCart(items, productId);
        if (bool === true) {
          enqueueSnackbar(
            "Item already in cart. Use the cart sidebar to update quantity or remove item.",
            { variant: "warning" }
          );
        } else {
          let response = await axios.post(
            `${config.endpoint}/cart`,
            {
              productId: productId,
              qty: qty,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `application/json`,
              },
            }
          );
          setCartData((prev) => [
            ...prev,
            { productId: `${productId}`, qty: `${qty}` },
          ]);

          // fetchCart(window.localStorage.getItem("token"));
        }
      }
    }
  };

  const handleQuantity = async () => {};

  return (
    <>
      <div>
        <Header children={debounceSearch} hasHiddenAuthButtons={theBool}>
          {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        </Header>
        {/* Search view for mobiles */}
        <TextField
          onChange={(e) => {
            debounceSearch(e, 0.5);
            // performSearch(e.target.value);
          }}
          className="search-mobile"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
        />
        {/* <Grid container>
            <Grid item className="product-grid">
              <Box className="hero">
                <p className="hero-heading">
                  India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                  to your door step
                </p>
              </Box>
            </Grid>
          </Grid> */}
        {api ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <p>Loading Products...</p>
          </Box>
        ) : status === 404 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <SentimentDissatisfied />
            <p>No products found</p>
          </Box>
        ) : theBool === true ? (
          <div>
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Stack direction="column">
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 4, lg: 4 }}
                >
                  <Grid item className="product-grid">
                    <Box className="hero">
                      <p className="hero-heading">
                        India’s{" "}
                        <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                        to your door step
                      </p>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {data.map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <ProductCard
                        product={item}
                        handleAddToCart={() => {
                          addToCart(
                            localStorage.getItem("token"),
                            cartData,
                            data,
                            item._id,
                            1,
                            { preventDuplicate: true }
                          );
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              <Cart
                products={data}
                items={cartData}
                handleQuantity={addToCart}
              />
            </Stack>
          </div>
        ) : (
          <div>
            <Grid container>
              <Grid item className="product-grid">
                <Box className="hero">
                  <p className="hero-heading">
                    India’s{" "}
                    <span className="hero-highlight">FASTEST DELIVERY</span> to
                    your door step
                  </p>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {data.map((item, index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                  <ProductCard
                    product={item}
                    handleAddToCart={() => {
                      addToCart(
                        localStorage.getItem("token"),
                        cartData,
                        data,
                        item._id,
                        1,
                        { preventDuplicate: true }
                      );
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {/* <Load api={api} />
          <ProductRender data={data} /> */}
        {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
        <Footer />
      </div>
      {/* <div>
          {theBool === true ? (
            <Cart/>
          ):(
            null
          )}
        </div> */}
    </>
  );
};

export default Products;
