export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_IS_LOADING = 'SET_IS_LOADING'
// export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
// export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
// export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
// export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    toys: [],
    isLoading: false,
    // isCartShown: false,
    // shoppingCart: [],
}

export function toyReducer(state = initialState, action) {
    // console.log('action', action)
    let toys
    // let shoppingCart

    switch (action.type) {
        // Toys
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }        
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(c => c._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        // Cart
        // case SET_CART_IS_SHOWN:
        //     return { ...state, isCartShown: action.isCartShown }
        // case REMOVE_CAR_FROM_CART:
        //     shoppingCart = state.shoppingCart.filter(c => c._id !== action.toyId)
        //     return { ...state, shoppingCart }
        // case ADD_CAR_TO_CART:
        //     shoppingCart = [...state.shoppingCart, action.toy]
        //     return { ...state, shoppingCart }
        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }
        default:
            return state
    }
}