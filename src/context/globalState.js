import React, { createContext, useEffect, useReducer } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import appReducers from "./appReducers";

const baseUrl = "http://157.230.248.17";
// const baseUrl = 'http://localhost:4000';


const initialState = {
  isLogin: false,
  refCode: null,
  cityLists: [],
  brands: [],
  transaksiBeforePayment: [],
  transaksiAfterPayment: [],
  products: [],
  komisi: null,
  transaksiKomisi: null,
  userData: null,
  address: {},
  informasiPembeli: { nama: "", email: "", phone: "" },
  services: null,
  courier: "",
  ongkosKirim: 0,
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  dataProvince: [],
  dataCity: [],
  dataDistrict: [],
  dataVoucher: [],
  dataWarranty: []
};
export const Context = createContext(initialState);
export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(appReducers, initialState);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(state.carts));
    localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
  }, [state]);

  // actions
  const fetchBrands = async () => {
    fetch(baseUrl + `/brand`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_BRAND", payload: data.brandList });
      });
  };

  const fetchProduct = () => {
    fetch(baseUrl + `/produk`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_PRODUCT", payload: data.data });
      });
  };

  const fetchCarts = () => {
    localStorage.setItem("carts", JSON.stringify(state.carts));
  };

  const setRefCode = (refcode) => {
    dispatch({ type: "SET_REFCODE", payload: refcode });
  };

  const addTocart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const changeCourier = (courier) => {
    dispatch({ type: "CHANGE_COURIER", payload: courier });
  };

  const editCart = (product) => {
    dispatch({ type: "EDIT_CART", payload: product });
  };

  const deleteCart = (id) => {
    dispatch({ type: "DELETE_CART", payload: id });
  };

  const setInformasiPembeli = (data) => {
    dispatch({ type: "SET_INFORMASI_PEMBELI", payload: data });
  };

  const addKtpAndNPWP = async (newdata) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + "/add-ktp-npwp", {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newdata),
    });
    data = await data.json();
    await fetchUserData()
    return data;
  };

  const updateAlamat = async (newdata, id) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/alamat${id ? `?${id}` : ''}`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newdata),
    });

    data = await data.json();
    dispatch({ type: "SET_ADDRESS", payload: data.data });
  };

  const setAlamat = (newdata) => {
    dispatch({ type: "SET_ADDRESS", payload: newdata });
  }

  const getOngkir = async (newdata) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/ongkir?senderCityId=${newdata.senderCityId}&recipientDistrictId=${newdata.recipientDistrictId}&weight=${newdata.weight}`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    dispatch({ type: "SERVICES", payload: data.data });
  };

  const editTotalprice = (data) => {
    dispatch({ type: "PRICE", payload: data });
  };

  const setOngkir = (price) => {
    dispatch({ type: "SET_ONGKIR", payload: price });
  };

  const checkedItem = (data) => {
    dispatch({ type: "CHECKED_ITEM", payload: data });
  };

  const resetLocal = () => {
    dispatch({ type: "RESET" });
  };

  const resetServices = () => {
    dispatch({ type: "RESET_SERVICES" });
  };

  const resetAddress = () => {
    dispatch({ type: "RESET_ADDRESS" });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const checkoutCart = async (itemData) => {
    try {
      let data = await fetch(baseUrl + `/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      data = await data.json();
      if (data.errMessage) {
        throw data;
      } else {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("transaksi id", data.transaksiId);
        localStorage.removeItem("carts");
        localStorage.removeItem("totalPrice");
        // dispatch({ type: "RESET" });
        return { message: "Success" };
      }
    } catch (error) {
      if (
        error.errMessage === "email address already in use" ||
        error.errMessage === "phone number already in use"
      ) {
        Swal.fire({
          title: `${error.errMessage}`,
          text: "Try to login with your email or phone number",
          icon: "error",
        });
        return { message: "go to login page" };
      } else {
        Swal.fire({
          title: `${error.errMessage}`,
          icon: "error",
        });
        return { message: "Failed" };
      }
    }
  };

  const confirmPayment = async (data, transaksiId, access_token, refferal) => {
    try {
      let url = refferal
        ? baseUrl + `/cart/${transaksiId}?ref=${refferal}`
        : baseUrl + `/cart/${transaksiId}`;
      let responseData = await fetch(url, {
        method: "POST",
        headers: { access_token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      responseData = await responseData.json();
      if (responseData.errMessage) {
        throw responseData;
      } else {
        localStorage.removeItem("transaksi id");
        localStorage.removeItem("transaksi");
        dispatch({ type: "RESET", payload: null });
        return { message: "Success" };
      }
    } catch (error) {
      return { message: "Failed" };
    }
  };

  const login = async (inputData) => {
    try {
      let data = await fetch(baseUrl + `/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
      data = await data.json();
      if (!data.access_token) {
        throw data;
      } else {
        localStorage.setItem("access_token", data.access_token);
        dispatch({ type: "LOGIN", payload: data.data });
        if (data.data.Alamats && data.data.Alamats.length > 0) dispatch({ type: "SET_ADDRESS", payload: data.data.Alamats[0] });
        return { message: "success" };
      }
    } catch (error) {
      Swal.fire({
        title: `${error.message}`,
        icon: "error",
      });
      return { message: "Failed" };
    }
  };

  const register = async (inputData) => {
    try {
      let data = await fetch(baseUrl + `/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
      data = await data.json();
      if (data.errMessage) {
        throw data;
      } else {
        return { message: "Success" };
      }
    } catch (error) {
      Swal.fire({
        title: `${error.errMessage}`,
        icon: "error",
      });
      return { message: "Failed" };
    }
  };

  const getRefcode = async () => {
    let data = await fetch(
      baseUrl + `/refcode/${localStorage.getItem("access_token")}`
    );
    data = await data.json();
    return data;
  };

  const fetchTransaksiBeforePayment = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/transaksiBeforePayment`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI_BEFORE_PAYMENT", payload: data });
  };

  const fetchTransaksiAfterPayment = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/transaksiAfterPayment`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI_AFTER_PAYMENT", payload: data });
  };

  const fetchKomisiData = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/komisi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_KOMISI", payload: data });
  };

  const fetchUserData = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/customerData`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();

    dispatch({ type: "FECTH_USER_DATA", payload: data });
    if (data.Alamats && data.Alamats.length > 0) dispatch({ type: "SET_ADDRESS", payload: data.Alamats[0] });
  };

  const fetchTransaksiKomisi = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/transaksiKomisi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI_KOMISI", payload: data });
  };

  const pesananSelesai = async (newData) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/pesanan-selesai`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    return data;
  };

  const editProfil = async (id, newData) => {
    const access_token = localStorage.getItem("access_token");
    await fetch(baseUrl + `/customer/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchUserData()
  };

  const getProvince = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/area/province`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    dispatch({ type: "FETCH_PROVINCE", payload: data.data });
  };

  const getCity = async (provinceId) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/area/city${provinceId ? `?provinceId=${provinceId}` : ''}`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    dispatch({ type: "FETCH_CITY", payload: data.data });
  };

  const getDistrict = async (cityId) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/area/district${cityId ? `?cityId=${cityId}` : ''}`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    dispatch({ type: "FETCH_DISTRICT", payload: data.data });
  };

  const trackingOrder = async (waybill) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/tracking/${waybill}`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    return data
  };

  const fetchVoucher = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/voucher?status=Sedang Berjalan`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();

    dispatch({ type: "FETCH_VOUCHER", payload: data.data });
  };

  const fetchWarranty = async (query) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/warranty${query || ''}`, {
      method: "GET",
      headers: { access_token },
    });

    data = await data.json();
    dispatch({ type: "SET_WARRANTY", payload: data.data });
  };

  const addWarranty = async (newdata) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/warranty`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newdata),
    });

    data = await data.json();

    if (data.message === "nomor machine already exist") {
      Swal.fire({
        title: `Warning`,
        text: "Nomor mesin sudah terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else if (data.message === "machine number not registered") {
      Swal.fire({
        title: `Warning`,
        text: "Nomor mesin tidak terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else if (data.message === "invoice not exist") {
      Swal.fire({
        title: `Warning`,
        text: "Invoice tidak terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else {
      return { message: "success" }
    }
  };

  const claimWarranty = async (newdata, id) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/warranty/${id}/claim`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newdata),
    });

    data = await data.json();
    dispatch({ type: "SET_ADDRESS", payload: data.data });
  };

  const editWarranty = async (newdata, id) => {
    const access_token = localStorage.getItem("access_token");
    let data = await fetch(baseUrl + `/warranty/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newdata),
    });
    data = await data.json();

    if (data.message === "nomor machine already exist") {
      Swal.fire({
        title: `Warning`,
        text: "Nomor mesin sudah terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else if (data.message === "machine number not registered") {
      Swal.fire({
        title: `Warning`,
        text: "Nomor mesin tidak terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else if (data.message === "invoice not exist") {
      Swal.fire({
        title: `Warning`,
        text: "Invoice tidak terdaftar",
        icon: "warning",
      });
      return { message: "error" };
    } else {
      return { message: "success" }
    }
  };

  const deleteWarranty = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(baseUrl + `/warranty/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    return { message: "success" };
  };

  return (
    <Context.Provider
      value={{
        baseUrl,
        refCode: state.refCode,
        brands: state.brands,
        products: state.products,
        cityLists: state.cityLists,
        carts: state.carts,
        isLogin: state.isLogin,
        address: state.address,
        totalPrice: state.totalPrice,
        services: state.services,
        ongkosKirim: state.ongkosKirim,
        transaksiBeforePayment: state.transaksiBeforePayment,
        transaksiAfterPayment: state.transaksiAfterPayment,
        komisi: state.komisi,
        userData: state.userData,
        transaksiKomisi: state.transaksiKomisi,
        informasiPembeli: state.informasiPembeli,
        dataProvince: state.dataProvince,
        dataCity: state.dataCity,
        dataDistrict: state.dataDistrict,
        dataVoucher: state.dataVoucher,
        dataWarranty: state.dataWarranty,
        fetchBrands,
        fetchProduct,
        fetchTransaksiBeforePayment,
        fetchTransaksiAfterPayment,
        fetchKomisiData,
        fetchTransaksiKomisi,
        fetchUserData,
        fetchCarts,
        addKtpAndNPWP,
        updateAlamat,
        setInformasiPembeli,
        setRefCode,
        addTocart,
        editTotalprice,
        checkedItem,
        setOngkir,
        editCart,
        checkoutCart,
        confirmPayment,
        getRefcode,
        changeCourier,
        deleteCart,
        getOngkir,
        login,
        register,
        resetLocal,
        resetServices,
        resetAddress,
        logout,
        pesananSelesai,
        editProfil,
        getProvince,
        getCity,
        getDistrict,
        setAlamat,
        trackingOrder,
        fetchVoucher,
        fetchWarranty,
        addWarranty,
        claimWarranty,
        editWarranty,
        deleteWarranty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};


// google-chrome --disable-web-security --user-data-dir="/tmp/chrome_tmp"