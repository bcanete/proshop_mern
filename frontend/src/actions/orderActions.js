import axios from 'axios'
import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS 
 } from "../constants/orderConstants"
import { USER_LOGIN_SUCCESS } from '../constants/userConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/orders`, order, config)
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:message
      })
    }
}