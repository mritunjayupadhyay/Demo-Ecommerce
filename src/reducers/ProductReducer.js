const INITIAL_STATE = {
  categories: {},
  items: [],
  item: null,
  category: null,
  itemName: null,
  cardItems: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION': {
      return { ...state, currentLocation: action.payload };
    }
    case 'ADD_CATEGORY': {
      const newObj = state.categories;
      newObj[action.payload.category] = action.payload.value;
      return { ...state, categories: newObj };
    }
    case 'DECREMENT_PRODUCT': {
      const arr = state.cardItems;
      const obj = action.payload;
      let newArr = []
      if (obj.no_of_items === 1) {
        newArr = arr.filter((d, i) => {
          if (i === obj.id) {
            return false;
          }
          return true;
        });
      } else {
        newArr = arr.map((d, i) => {
          if (i === obj.id) {
            const m = d.no_of_items;
            d.no_of_items = m - 1;
            return d;
          }
          return d;
        });
      }
      return { ...state, cardItems: newArr };
    }
    case 'INCREMENT_PRODUCT': {
      const arr = state.cardItems;
      const obj = action.payload;
      let newArr = arr.map((d, i) => {
        if (i === obj.id) {
          const m = d.no_of_items;
          d.no_of_items = m + 1;
          return d;
        }
        return d;
      });
      return { ...state, cardItems: newArr };
    }
    case 'REMOVE_CART_ITEM': {
      const arr = state.cardItems;
      const newArr = arr.filter((d, i) => {
        if (i === action.payload) {
          return false;
        }
        return true;
      });
      return { ...state, cardItems: newArr };
    }
    case 'ADD_TO_CART': {
      const arr = state.cardItems;
      let newArr = [];
      const obj = action.payload;
      if (obj.no_of_items === 1) {
        arr.push(obj);
        newArr = arr;
      } else {
        newArr = arr.map((d, i) => {
          if (d.id === obj.id) {
            return obj;
          }
          return d;
        });
      }
      return { ...state, cardItems: newArr };
    }
    case 'GET_CARD_ITEM': {
      return { ...state, cardItems: action.payload };
    }
    case 'SET_ITEM_NAME': {
      return { ...state, itemName: action.payload };
    }
    case 'MAKE_ITEM_NIL': {
      return { ...state, item: null, itemName: null };
    }
    case 'GET_CATEGORIES': {
      return { ...state, categories: action.payload };
    }
    case 'GET_ITEM': {
      return { ...state, item: action.payload };
    }
    case 'GET_ITEMS': {
      return { ...state, items: action.payload };
    }
    case 'SET_CATEGORY': {
      return { ...state, category: action.payload };
    }
    default:
     return { ...state };
  }
};
