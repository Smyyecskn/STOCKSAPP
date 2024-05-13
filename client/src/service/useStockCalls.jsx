import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
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
      const { data } = await axiosWithToken.get(`/${url}`);
      const apiData = data.data;
      dispatch(getStockSuccess({ apiData, url }));
      toastSuccessNotify(`${url} listesi getirildi`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} listesi getirilemedi`);
    }
  };
  const deleteStock = async (url = "firms", id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/${url}/${id}`);
      toastSuccessNotify(`Firma başarıyla silindi`);
      getStocks();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Firma listesi silinemedi`);
    }
  };

  const editStock = async (url = "firms", id, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/${url}/${id}`, body);
      toastSuccessNotify(`Firma başarıyla güncellendi`);
      getStocks();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Firma güncellenemedi`);
    }
  };

  return { getStocks, deleteStock, editStock };
};

export default useStockCalls;
