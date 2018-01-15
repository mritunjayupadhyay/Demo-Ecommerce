
export const addToFirebase = (obj, category) => {
  console.log(obj, category);
  firebase.database().ref(`root/${category}`).push(obj);
  return {
    type: 'No',
    payload: obj
  };
};

export const getCategory = () => {
  return (dispatch) => {
    const objLocal = { categories: null };
    const response = firebase.database().ref('categories').on('value', (snapshot) => {
      objLocal.categories = snapshot.val();
      console.log('All categories', objLocal);
      dispatch({ type: 'GET_CATEGORIES', payload: objLocal.categories });
    });
  };
};
export const getItem = (id) => {
  console.log('value of id come from', id);
  return (dispatch) => {
    firebase.database().ref(`Items/${id}`).once('value', (snapshot) => {
       dispatch({ type: 'GET_ITEM', payload: snapshot.val() });
    });
  };
};
export const addToCart = (obj) => {
  return (dispatch) => {
    firebase.database().ref(`Cart/${obj.id}`).once('value', (snapshot) => {
      const val = snapshot.val();
      if (val === null) {
        obj.no_of_items = 1;
        firebase.database().ref(`Cart/${obj.id}`).set(obj);
      } else {
        obj.no_of_items = val.no_of_items + 1;
        firebase.database().ref(`Cart/${obj.id}/no_of_items`).set(val.no_of_items + 1);
      }
      dispatch({ type: 'ADD_TO_CART', payload: obj });
    });
  }
};
export const getCardItem = () => {
  console.log('card get item is called');
  return (dispatch) => {
    firebase.database().ref('Cart').on('value', (snapshot) => {
      const obj = snapshot.val();
      let arr = []
      if (obj !== null) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          arr.push(obj[keys[i]]);
        }
      }
      dispatch({ type: 'GET_CARD_ITEM', payload: arr });
    });
  };
};
export const incrementItemCard = (obj) => {
  return (dispatch) => {
    firebase.database().ref(`Cart/${obj.id}/no_of_items`).set(obj.no_of_items + 1);
    dispatch({ type: 'INCREMENT_PRODUCT', payload: obj });
  };
}
export const decrementItemCard = (obj) => {
  return (dispatch) => {
    if (obj.no_of_items === 0) {
      firebase.database().ref(`Cart/${obj.id}`).set(null);
    } else {
      firebase.database().ref(`Cart/${obj.id}/no_of_items`).set(obj.no_of_items - 1);
    }
    dispatch({ type: 'DECREMENT_PRODUCT', payload: obj });
  };
}
export const removeItemFromCart = (id) => {
  console.log('removeItemFromCart', id);
  return (dispatch) => {
    firebase.database().ref(`Cart/${id}`).set(null);
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
  };
};
export const addItemsToFirebase = (obj, category) => {
  return (dispatch) => {
    firebase.database().ref('Items').once('value', (snapshot) => {
      const val = (snapshot.val() === null) ? 1 : Object.keys(snapshot.val()).length + 1;
      obj.id = val;
      firebase.database().ref(`Items/${val}`).set(obj);
      firebase.database().ref(`root/${category}`).push(obj);
      firebase.database().ref(`NameAndId`).push({ name: obj.name, id: val });
      dispatch({ type: 'DO NOTHING' });
    });
  };
};
export const makeItemNil = () => {
  return { type: 'MAKE_ITEM_NIL' };
};
export const setItemName = (itemName) => {
  return { type: 'SET_ITEM_NAME', payload: itemName };
};
export const getItems = (category) => {
  return (dispatch) => {
    const objLocal = { categories: null };
    const response = firebase.database().ref(`root/${category}`).on('value', (snapshot) => {
      objLocal.categories = snapshot.val();
      console.log('All Item', objLocal);
      dispatch({ type: 'GET_ITEMS', payload: objLocal.categories });
    });
  };
};

export const setCategory = (name) => {
  return { type: 'SET_CATEGORY', payload: name };
}

export const addCategory = (obj, category) => {
  const keys = Object.keys(obj);
  let val = 0;
  if (keys.indexOf(category) !== -1) {
    val = obj[category];
  }
  firebase.database().ref(`categories/${category}`).set(val + 1);
  return { type: 'ADD_CATEGORY', payload: { category, value: val + 1 }};
};
