export const userByIdURL = (id) => `http://localhost:3001/user/verify/${id}`
export const verifyRestaurantByIdURL = (id) => `http://localhost:3001/restaurant/verify/${id}`
export const loginURL = 'http://localhost:3001/user/login'
export const credsURL = 'http://localhost:3001/authentication'
export const signUpURL = 'http://localhost:3001/user/signup'
export const allRestaurantsURL = 'https://server-om6g.onrender.com/restaurant'
export const oneRestaurantURL = (id) => `http://localhost:3001/restaurant/${id}`
export const loginRestaurantURL = 'http://localhost:3001/restaurant/login'
export const registerRestaurantURL = 'http://localhost:3001/restaurant/register'
export const googleAuthURL = 'http://localhost:3001/user/google'
export const accountVerificationURL = 'http://localhost:3001/user/verify'
export const restaurantVerificationURL = 'http://localhost:3001/restaurant/verify'
export const preVerifyRestaurantRegistrationURL = 'http://localhost:3001/restaurant/register/verify'
export const getOrdersByRestId = (id) => `http://localhost:3001/orders/ordenes?restId=${id}`
export const shopPanelURL = (option) => `http://localhost:3001/shop?option=${option}`
export const shopPasswordChangeURL = `http://localhost:3001/shop/password`
export const getAllFoodURL = `http://localhost:3001/foods`
export const getOrdersByUserIdURL = (userId) =>`http://localhost:3001/orders/${userId}`
export const addFavoriteRestaurantURL = `http://localhost:3001/user/favorite`
export const getFavoritesRestaurantsURL = (userId)=>`http://localhost:3001/user/favorite/${userId}`
export const getFoodByRestaurantURL = (restId)=>`http://localhost:3001/foods/foodsRestaurant/${restId}`
export const foodUpdateRestaurant = `http://localhost:3001/shop/food`
export const getShopInfoURL = (restId) =>`http://localhost:3001/shop/${restId}`
export const reviewURL = `http://localhost:3001/reviews`