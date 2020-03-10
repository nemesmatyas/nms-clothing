import { createSelector } from 'reselect';

// Input selector. Gets the entire state and returns a slice of it
const selectCart = state => state.cart;


/**
 * Output selector. Calls createSelector
 * @param {array} selectCart - the array of input selectors needed
 * @param {function} - takes the slices of state needed (cart, user, etc.) and returns the pieces we want to use as a memoized value
 *  
 */ 
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);


/**
 * Output selector. Calls createSelector
 * @param {array} selectCartItems - the array of input selectors needed
 * @param {function} - takes the slices of state needed (cart, user, etc.) and returns a memoized calculated value.
 * In this case, it is the overall quantity of cart items 
 */ 
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(((accumulator, currentItem) => accumulator + currentItem.quantity), 0)
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity), 0)
)