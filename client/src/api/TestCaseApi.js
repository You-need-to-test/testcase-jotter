import ApiRequest from './ApiService.js';


export default {

  getTestCases: async () => {
    const request = await ApiRequest.get('/api/testcase');
    if (request.success) {
      return request.response;
    } else {
      return request.error;
    }
  },

  createTestCases: async (body) => {
    const request = await ApiRequest.post('/api/testcase', body);
    if (request.success) {
      return request.response;
    } else {
      return request.error;
    }
  },
};