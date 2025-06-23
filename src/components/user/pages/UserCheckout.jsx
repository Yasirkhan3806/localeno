
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { convertToPKR } from '../../../utils/currency';
import CheckoutHeader from '../checkout/CheckoutHeader';
import ShippingAddressSection from '../checkout/ShippingAddressSection';
import PaymentMethodSection from '../checkout/PaymentMethodSection';
import OrderItemsPreview from '../checkout/OrderItemsPreview';
import OrderSummary from '../checkout/OrderSummary';
import AddAddressModal from './AddAddressModal';
import { addOrder } from '../../../Firebase Functions/orderFunctions';
import { useCartContext } from '../../../contexts/CartContext';
import { useAllProducts } from '../../../contexts/ProductsContext';
import { auth } from '../../../config/firebaseConfig';

const UserCheckout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const {allProducts} = useAllProducts();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const {contextCart,clearCart} = useCartContext()
  const [productInfo,setProductInfo] = useState([])


  const [mockAddresses, setMockAddresses] = useState([
    { id: 1, label: "Home", address: "123 Main St, Springfield, USA", phone: "+1 234-567-8900" },
    { id: 2, label: "Work", address: "456 5th Ave, Metropolis, USA", phone: "+1 234-567-8901" }
  ]);

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' },
    { id: 'jazzcash', label: 'JazzCash', icon: '📱', description: 'Mobile wallet payment' },
    { id: 'bank', label: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard accepted' }
  ];

  const subtotal = cart.reduce((sum, item) => sum + (convertToPKR(item.price) * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1);
  const shipping = subtotal > 28000 ? 0 : 4200;
  const total = subtotal + tax + shipping;

  useEffect(()=>{

    
      console.log(allProducts)
      console.log(cart)
    if (allProducts && contextCart && allProducts.length && contextCart.length) {
      const mappedProducts = contextCart.map(cartItem => {
        const product = allProducts.find(p => p.id === cartItem.id);
        if (product) {
          return {
            id: product.id,
            productsData: product?.productsData,
            sellerRef: product.sellerRef,
            quantity: cartItem.quantity,
          };
        }
        return null;
      }).filter(Boolean);
      // console.log(mappedProducts)
      setProductInfo(mappedProducts);
    }
  },[allProducts])

  // useEffect(()=>{
  //   // console.log(productInfo)
  // },[productInfo])
  const handlePlaceOrder = async() => {
    console.log(contextCart)
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    setIsProcessing(true);
const orderData = {
      userId,
      productInfo,
      selectedAddress,
      selectedPayment,
      subtotal,
      tax,
      shipping,
      total,
      tracingNumber: Math.random().toString(36).substring(2, 10).toUpperCase(),
      status: "In Process",
      orderNumber: `ord-${Date.now()}`, // More unique than date string
      estimatedDelievery: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      })(),
      orderPlaced: new Date().toISOString(), // ISO format for better consistency
}
    const result = await addOrder(orderData)
    // console.log(result)
     setIsProcessing(false);
      clearCart();
      alert('Order placed successfully! 🎉');
      navigate('/user/orders');
  };

  const handleAddAddress = (newAddress) => {
    setMockAddresses([...mockAddresses, newAddress]);
    setSelectedAddress(newAddress.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <CheckoutHeader />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <ShippingAddressSection
              mockAddresses={mockAddresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setShowAddAddressModal={setShowAddAddressModal}
            />

            <PaymentMethodSection
              paymentMethods={paymentMethods}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />

            <OrderItemsPreview cart={cart} />
          </div>

          <div className="xl:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              isProcessing={isProcessing}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>

      <AddAddressModal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
};

export default UserCheckout;
