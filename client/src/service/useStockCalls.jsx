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

  return { getStocks };
};

export default useStockCalls;
