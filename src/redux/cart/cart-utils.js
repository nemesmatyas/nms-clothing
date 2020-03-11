/**
 * Group cart items together, so when multiple items of the same type are added (for example 3 blue beanies), they are grouped together
 * This function checks if the new item that we want to add already exists in the cart
 * If it exists, it just adds 1 to the quantity, but doesn't add an entirely new item to the cart
 * It it doesn't exist, it adds a new item and sets the quantity to 1
 * @param {cartItems} - The existing items in the cart
 * @param {cartItemToAdd} - The cart item that we want to add
 */
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1}]
}

/**
 * Decrease the quantity of a cart item, if the user clicks on the left arrow next to the quantity on the Checkout Page
 * Checks if the cartItemToRemove is already part of the existing cartItems, and checks its quantity
 * If the quantity is 1, we remove it from the cart
 * If not 1, we remove the quantity by 1
 */
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    
    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id 
                                        ? { ...cartItem, quantity: cartItem.quantity - 1} 
                                        : cartItem)
}