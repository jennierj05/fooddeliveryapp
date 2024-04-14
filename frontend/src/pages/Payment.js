import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectPayment } from '../actions/orders';

const Payment = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartPrice = cartItems.reduce((total, itm) => total + itm?.price * itm?.qty, 0);
  const deliveryPrice = cartPrice > 500 || cartPrice === 0 ? 0 : 50;
  const discount = 0;
  const totalPrice = cartPrice + deliveryPrice - discount;
  const [paymentType, setPaymentType] = useState('COD');

  const handlePlaceOrder = () => {
    dispatch(selectPayment(paymentType));
    navigate('/order');
  };

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, []);

  const handleRazorpayPayment = () => {
    // Initiate Razorpay payment
    var options = {
      key: 'rzp_test_WqgTwAho34JCMY', // Replace with your Razorpay key
      amount: totalPrice * 100, // Amount should be in paise
      currency: 'INR',
      name: 'STARTUP_PROJECTS',
      description: 'Payment for your order',
      handler: function (response) {
        // Handle successful payment
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
        handlePlaceOrder(); // Proceed to order placement
      },
      prefill: {
        name: 'jennie Roopa', // Fill with user's name
        email: "jennieroopakumar_bai25@mepcoeng.ac.in", // Fill with user's email
        contact: "6381738156", // Fill with user's phone number
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='shipping'>
      <div className='progress'>
        <div className='status'>
          <p>Bag</p>
          <div className={`divider`}></div>
          <p className={` ${path === '/shipping' && 'active'}`}>Shipping</p>
          <div className='divider'></div>
          <p className={` ${path === '/payment' && 'active'}`}>Payment</p>
          <div className='divider'></div>
          <p className={` ${path === '/order' && 'active'}`}>Order</p>
        </div>
      </div>
      <div className='shipping-details'>
        <div className='address'>
          <h3>Select Payment type</h3>
          <div className='payments-opts'>
            <div className='payment-method'>
              <div className='select-opt' onClick={() => setPaymentType('COD')}>
                <input type='radio' value='COD' name='payment' id='cod' checked />
                <label htmlFor='cod'>CASH ON DELIVERY</label>
              </div>
              <div className='select-opt' onClick={handleRazorpayPayment}>
                <input type='radio' value='razorpay' name='payment' id='razorpay' />
                <label htmlFor='razorpay'>RAZORPAY</label>
                <button>Pay with Razorpay</button>
              </div>
            </div>
          </div>
        </div>
        <div className='checkout-area'>
          <div className='billing'>
            <h4>PRICE DETAILS</h4>
            <div className='details'>
              <div className='item'>
                <p>Price</p>
                <p>
                  <span>₹</span>
                  {cartPrice}
                </p>
              </div>
              <div className='item'>
                <p>Delivery Charges</p>
                <p>{deliveryPrice === 0 ? <span className='free'>Free</span> : <span>₹{deliveryPrice}</span>}</p>
              </div>
            </div>
            <div className='total'>
              <h3>Total</h3>
              <h3>
                <span>₹</span>
                {totalPrice}
              </h3>
            </div>
          </div>
          <button onClick={handlePlaceOrder} disabled={totalPrice === 0 ? true : false}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
