import axios from "@/lib/axios";

const productService = {
  fetchAll: async () => {
    try {
      const response = await axios.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
