export default (state, action) => {
  switch (action.type) {
    case "FETCH_BRAND":
      return {
        ...state,
        brands: action.payload,
      };
    case "FETCH_PRODUCT":
      return {
        ...state,
        products: action.payload.filter((el) => el.statusProduk === true),
      };
    case "FETCH_TRANSAKSI_BEFORE_PAYMENT":
      return {
        ...state,
        transaksiBeforePayment: action.payload,
      };
    case "FETCH_TRANSAKSI_AFTER_PAYMENT":
      return {
        ...state,
        transaksiAfterPayment: action.payload,
      };
    case "FETCH_KOMISI":
      return {
        ...state,
        komisi: action.payload,
      };
    case "FETCH_TRANSAKSI_KOMISI":
      return {
        ...state,
        transaksiKomisi: action.payload,
      };
    case "FECTH_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_REFCODE":
      return {
        ...state,
        refCode: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    case "PRICE":
      if (action.payload.status === "increment") {
        return {
          ...state,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        return {
          ...state,
          totalPrice: state.totalPrice - action.payload.price,
        };
      }
    case "CHECKED_ITEM":
      const newCarts = state.carts.filter(
        (cart) => cart.product.id !== action.payload.product.id
      );
      return {
        ...state,
        carts: [action.payload, ...newCarts],
      };
    case "CHANGE_COURIER":
      return {
        ...state,
        courier: action.payload,
      };
    case "SET_ONGKIR":
      return {
        ...state,
        ongkosKirim: action.payload,
      };
    case "EDIT_CART":
      const filtered = state.carts.filter(
        (cart) => cart.product.id !== action.payload.product.id
      );
      return {
        ...state,
        carts: [action.payload, ...filtered],
      };
    case "DELETE_CART":
      const filteredCarts = state.carts.filter(
        (cart) => cart.product.id !== action.payload
      );
      return {
        ...state,
        carts: [...filteredCarts],
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_INFORMASI_PEMBELI":
      return {
        ...state,
        informasiPembeli: action.payload,
      };
    case "FETCH_PROVINCE":
      return {
        ...state,
        dataProvince: action.payload,
      };
    case "FETCH_CITY":
      return {
        ...state,
        dataCity: action.payload,
      };
    case "FETCH_DISTRICT":
      return {
        ...state,
        dataDistrict: action.payload,
      };
    case "SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        userData: action.payload,
      };
    case "RESET":
      return {
        ...state,
        carts: [],
        totalPrice: 0,
        // address: {},
        courier: "",
        ongkosKirim: 0,
        services: null,
      };
    case "RESET_SERVICES":
      return {
        ...state,
        services: null,
      };
    case "RESET_ADDRESS":
      return {
        ...state,
        address: {},
      };
    case "LOGOUT":
      return {
        ...state,
        carts: [],
        totalPrice: 0,
        address: {},
        courier: "",
        ongkosKirim: 0,
        services: null,
        userData: null,
      };
    default:
      return state;
  }
};
