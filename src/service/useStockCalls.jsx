import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getProPurBrandFirmSuccess,
  getStockSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  // const getFirms = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosWithToken.get("/firms");
  //     dispatch(getFirmSuccess(data.data));
  //     console.log(data.data);
  //     toastSuccessNotify("Firm listesi getirildi");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     toastErrorNotify("Firm listesi getirilemedi");
  //   }
  // };
  const getStocks = async (url = "firms") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/${url}`);
      const apiData = data.data;
      // console.log(apiData, "categories");
      dispatch(getStockSuccess({ apiData, url }));
      toastSuccessNotify(`${url} listesi getirildi`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} listesi getirilemedi`);
    }
  };

  const getProPurBrandFirm = async () => {
    dispatch(fetchStart());

    try {
      const [products, purchases, brands, firms, categories] =
        await Promise.all([
          axiosWithToken("/products/"),
          axiosWithToken("/purchases/"),
          axiosWithToken("/brands/"),
          axiosWithToken("/firms/"),
        ]);
      dispatch(
        getProPurBrandFirmSuccess([
          products?.data?.data,
          purchases?.data?.data,
          brands?.data?.data,
          firms?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const deleteStock = async (url = "firms", id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/${url}/${id}`);
      toastSuccessNotify(`${url} bilgileri başarıyla silindi`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} bilgileri silinemedi!`);
    }
  };
  const postStock = async (url = "firms", body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, body);
      toastSuccessNotify(`${url} başarıyla eklendi`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} eklenemedi`);
    }
  };

  const putStock = async (url = "firms", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/${url}/${info._id}`, info);
      toastSuccessNotify(`${url} başarıyla güncellendi`);
      getStocks(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} güncellenemedi`);
    }
  };

  return { getStocks, deleteStock, postStock, putStock, getProPurBrandFirm };
};

export default useStockCalls;
