import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getAllProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all-products`);

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getPosebnaPonuda = async () =>
  await axios.get(`${process.env.REACT_APP_API}/posebna-ponuda`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const sizeSearch = async (width, height, rim) =>
  await axios.get(
    `${process.env.REACT_APP_API}/dimenzija/${width}/${height}/${rim}`
  );

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByBrand = async (brand) => {
  await axios.get(`${process.env.REACT_APP_API}/productsByBrand/${brand}`);
};

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getProductsForPagination = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
