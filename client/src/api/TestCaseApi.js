import ApiRequest from './ApiService.js';


export default {
  //suite id
  getTestCases: async () => {
    const request = await ApiRequest.get('/api/testcase');
    if (request.success) {
      return request.response;
    } else {
      return request.error;
    }
  },

  //suite id
  createTestCases: async (body) => {
    const request = await ApiRequest.post('/api/testcase', body);
    if (request.success) {
      return request.response;
    } else {
      return request.error;
    }
  },
};