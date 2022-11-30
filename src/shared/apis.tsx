import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookieToken, deleteCookie } from './cookie';
import { FormValues, IDeleteRegistrationModelApiProps, IDeleteRegistrationOptionApiProps, IDeleteManagementApiProps } from './type/Interface';

const api = axios.create({
  // axios 버전이 바뀌면서 기존 문법이 안먹히던 이슈 발생
  // headers의 Content-Type와 Accpet 설정 & config.headers 설정
  baseURL: process.env.REACT_APP_BACKEND_TEMP_ADDRESS,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json,',
  },
});

api.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const accessToken = getCookie('Authorization');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    //response 에서 error 가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      const errorStatus = error.response?.status;
      const errorData = error.response?.data;
      const prevRequst = error?.config;
      if (errorStatus === 401) {
        if (errorData.message === 'USER_DISCREPANCY_ERR') {
          alert('타 기기에서 로그인을 하였습니다.');
          deleteCookie('Authorization');
          deleteCookie('RefreshToken');
        }
        // 새로운 토큰 발행 요청
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_TEMP_ADDRESS}/auth/reissue`,
          {
            headers: {
              Authorization: `Bearer ${getCookie('Authorization')}`,
              RAuthorization: `Bearer ${getCookie('RefreshToken')}`,
            },
          }
        );
        // 새로받은 토큰 저장
        setCookieToken(res.data.result[0].accessToken);
        setCookieToken(res.data.result[0].refreshToken);
        // 헤더에 새로운 token으로 설정
        prevRequst.headers.Authorization = `Bearer ${getCookie(
          'Authorization'
        )}`;
        // 실패했던 기존 request 재시도
        return await axios(prevRequst);
      } else {
        return Promise.reject(error);
      }
    } catch (e) {
      //오류내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  }
);

const apis = {
  // AUTH
  login: (data: FormValues) => api.post('/auth/login', data),
  logout: () => api.delete('/auth/logout'),
  findPw: (data: FormValues) => api.post('/user/search/password', data),
  checkId: (id: string | undefined) => api.get(`/user/account/${id}`),
  checkEmail: (data: string | undefined) => api.post('/user/email', data),
  signUpCompany: (data: FormValues) => api.post('/company', data),
  signUpUser: (data: FormValues) => api.post('/user', data),

  // DASHBOARD
  getTotalStatus: () => api.get('/dashboard/status'),
  getModlinkConnection: () => api.get('/dashboard/equipment/modlink'),
  getModelCardList: () => api.get('/dashboard/model/status'),
  toogleBookmark: (id: number) => api.patch(`/dashboard/bookmark/${id}`),
  getLocation: () => api.get('/dashboard/equipment/location'),

  // REGISTRATION
  getRegistrationModel: (currentPage: number, searchType: string, search: string) => api.get(`/model?page=${currentPage}&size=10&searchType=${searchType}&search=${search}`),
  deleteRegistrationModel: (data: IDeleteRegistrationModelApiProps) => api.delete('/model', { data: data }), // delete 요청에서 body값을 넘기려면 객체로 한번 감싸주어야 핢.
  // addRegistrationModel: 별도의 content-type 설정을 위해 RegistrationMachineModal 컴포넌트에서 따로 선언

  getRegistrationOption: (currentPage: number, searchType: string, search: string) => api.get(`/option?page=${currentPage}&size=10&searchType=${searchType}&search=${search}`),
  deleteRegistrationOption: (data: IDeleteRegistrationOptionApiProps) => api.delete('/option', { data: data }), // delete 요청에서 body값을 넘기려면 객체로 한번 감싸주어야 핢.
  // addRegistrationOption: 별도의 content-type 설정을 위해 RegistrationMachineModal 컴포넌트에서 따로 선언

  //MANAGEMENT
  getManagementList: (currentPage: number, searchType: string, search: string) => api.post(`/equipment/filter?searchType=${searchType}&search=${search}&orderType=&page=${currentPage}&size=10`),
  deleteManagement: (data: IDeleteManagementApiProps) => api.delete('/equipment', { data: data }), // delete 요청에서 body값을 넘기려면 객체로 한번 감싸주어야 핢.
};
export default apis;
