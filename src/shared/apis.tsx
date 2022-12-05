import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookieToken, deleteCookie } from './cookie';
import { FormValues, IDeleteRegistrationModelApiProps, IDeleteRegistrationOptionApiProps, IDeleteManagementApiProps, IManagementApiProps } from './type/Interface';

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

// 최근 3개월간의 파라미터 히스토리
const date = new Date();
// 1,2월달 일 때, -2를 하면 음수로 날짜 오류 뜨는 걸 방지하기 위해 임시 날짜 형성
const lastMonthCal = new Date();
lastMonthCal.setMonth(lastMonthCal.getMonth() - 2)

const year = date.getFullYear();
const lastMonth = ('0' + lastMonthCal.getMonth()).slice(-2);
const currentMonth = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);

const apis = {
  // LOGIN
  login: (data: FormValues) => api.post('/auth/login', data),
  logout: () => api.delete('/auth/logout'),
  findPw: (data: FormValues) => api.post('/user/search/password', data),
  checkId: (id: string | undefined) => api.get(`/user/account/${id}`),
  checkEmail: (data: string | undefined) => api.post('/user/email', data),
  signUpCompany: (data: FormValues) => api.post('/company', data),
  signUpUser: (data: FormValues) => api.post('/user', data),
  // AUTH
  myPage: () => api.get('/user'),
  myPageGetCompanyInfo: () => api.get('/company/user'),
  withdrawAccount: (data: string) => api.post('/user/withdrawal', data),
  changePassword: (data: { account: string | undefined, password: string | undefined, newPassword: string | undefined}) => api.post('/user/reset/password', data),
  // AUTH APPROVE
  getCompanyAccountList: () => api.get('/admin/user'),
  approveRequest: (id: string) => api.patch(`/admin/user/approval/${id}`),
  rejectRequest: (id: string) => api.delete(`/admin/user/refusal/${id}`),
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
  addManagement: (data: any) => api.post('/equipment', data),
  //MANAGEMENT POST CONDITION
  getSelectModel: () => api.get('/equipment/model'),
  getSelectOption: () => api.get('/equipment/option'),
  macCheck: (data: string | undefined) => api.post('/equipment/mac', data),
  //MANAGEMENT DETAIL
  getDetailMachineInfo: (id: string | undefined) => api.get(`/equipment/${id}`),
  plcInputData: (id: string | undefined) => api.get(`/equipment/${id}/input`),
  plcOutputData: (id: string | undefined)=> api.get(`/equipment/${id}/output`),
  getParameterData: (id: string | undefined) => api.get(`/equipment/${id}/parameter`),
  getParameterHistoryData: (id: string | undefined, currentPage: number | undefined) => api.get(`/equipment/${id}/parameter/history?page=${currentPage}&size=5&startDate=${`${year}-${lastMonth}-${day}`}&endDate=${`${year}-${currentMonth}-${day}`}`),
  getAlarmHistoryData: (id : string | undefined, currentPage: number, last: string | undefined, current: string | undefined) => api.get(`/equipment/${id}/alarm/history?page=${currentPage}&size=5&startDate=${last}&endDate=${current}`),
  getErrorHistoryData: (id : string | undefined, currentPage: number, last: string | undefined, current: string | undefined) => api.get(`/equipment/${id}/error/history?page=${currentPage}&size=5&startDate=${last}&endDate=${current}`),
  //BOARD NOTICE PROGIX
  getNoticeProgix: (currentPage: number, searchType: string, search: string) => api.get(`/notice?page=${currentPage}&size=10&searchType=${searchType}&search=${search}`),
  getNoticeProgixDetail: (id : string | undefined) => api.get(`/notice/${id}`),
  addNoticeProgix: (data: any) => api.post('/notice', data),
  deleteNoticeProgix: (id : string | undefined) => api.delete(`/notice/${id}`),
  //BOARD INQUIRY
  getNoticeInquiry: (currentPage: number, searchType: string, search: string) => api.get(`/inquiry?searchType=${searchType}&search=${search}&orderType=&order=&page=${currentPage}&size=10`),
  getNoticeInquiryDetail: (id : string | undefined) => api.get(`/inquiry/${id}`),
  addNoticeInquiry: (data: any) => api.post('/inquiry', data),
  deleteNoticeInquiry: (id : string | undefined) => api.delete(`/inquiry/${id}`),
};
export default apis;
