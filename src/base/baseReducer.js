export const initialState = {
  format: {},
  item: {},
  list: [],
  session: {
    auth_token: '',
    auth_access: '',
    user_id: '',
    user_name: '',
    user_role: '',
    table: null,
    alert: {
      variant: null,
      message: null
    }
  }
};

const baseReducer = (state, action) => {
  switch (action.type) {
    case 'LIST_GET':
      return {
        ...state,
        list: action.payload.list,
        format: action.payload.format
      };
    case 'ITEM_GET':
      return {
        ...state,
        item: action.payload.item,
        format: action.payload.format
      };
    case 'ITEM_CREATE':
      return {
        ...state,
        list: state.list.concat([action.payload.item]),
        item: {}
      };
    case 'ITEM_UPDATE':
      return {
        ...state,
        list: state.list
          .filter(it => {
            const deletedId = (id) => it.hasOwnProperty('id') && id === state.item.id;
            const deletedCod = (cod) => it.hasOwnProperty('cod') && cod === state.item.cod;
            return (state.item && !deletedId(it.id) && ! deletedCod(it.cod))
          })
          .concat([action.payload.item]),
        item: {}
      };
    case 'FIELD_UPDATE':
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.name]: action.payload.value
        }
      };
    case 'ITEM_DELETE':
      const keyName = Object.keys(action.payload)[0]
      const keyValue = action.payload[keyName]
      return {
        ...state,
        list: state.list.filter(it => it[keyName].toString() !== keyValue.toString()),
        item: {}
      };
    case 'ITEM_CLOSE':
      return {
        ...state,
        item: {}
      };
    case 'LOGIN':
      return {
        ...state,
        session: action.payload.session
      };
    case 'LOGOUT':
      return initialState;
    case 'ALERT_SHOW':
      return {
        ...state,
        session: {
          ...state.session,
          alert: {
            variant: action.payload.session.alert.type || 'error',
            message: action.payload.session.alert.message || 'Error',
          }
        }
      };
    case 'ALERT_HIDE':
      return {
        ...state,
        session: {
          ...state.session,
          alert: null
        }
      };
    default:
      return state;
  }
}

export default baseReducer;
