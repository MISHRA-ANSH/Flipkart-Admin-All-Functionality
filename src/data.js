// src/data.js
const products = Array.from({ length: 26 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    image: `https://picsum.photos/200/300?random=${index + 1}`, // Random online images
    description: `This is a dummy description for Product ${index + 1}.`,
  }));
  
  export default products;