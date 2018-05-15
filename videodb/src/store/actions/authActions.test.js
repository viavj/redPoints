
import endPoints from '../../shared/AxiosConfig/EndPoints';
import axios from 'axios';


describe('gnomeActions', () => {
    it('Expect to receive request token', () => {
        expect.assertions(1);
        return axios.get(endPoints.getToken).then(res => {
            expect(typeof res.data.request_token).toBe('string');
        })
    })
})