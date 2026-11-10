const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const products = ref([]);
    const cart = ref(JSON.parse(localStorage.getItem('sweetart_cart')) || []);
    
    const form = ref({
      customer_name: '',
      address: '',
      phone: ''
    });

    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        products.value = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Save cart state to localStorage
    const saveCart = () => {
      localStorage.setItem('sweetart_cart', JSON.stringify(cart.value));
    };

    // Add item to cart
    const addToCart = (product) => {
      const existing = cart.value.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
      saveCart();
      alert(`Added ${product.name} to your cart! 🍰`);
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
      cart.value = cart.value.filter(item => item.id !== productId);
      saveCart();
    };

    // Computed total item count
    const cartCount = computed(() => {
      return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Computed total price
    const cartTotal = computed(() => {
      return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    // Submit order to backend
    const submitOrder = async () => {
      if (cart.value.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      const orderData = {
        customer_name: form.value.customer_name,
        address: form.value.address,
        phone: form.value.phone,
        total_price: cartTotal.value
      };

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (response.ok) {
          alert(`Thank you! Order #${result.orderId} placed successfully.`);
          cart.value = [];
          saveCart();
          window.location.href = 'index.html';
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Failed to place order. Please try again.');
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      cart,
      form,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      submitOrder
    };
  }
}).mount('#app');