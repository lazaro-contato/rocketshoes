import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [stock, setStock] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>('products')
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      setProducts(data)
    }
    loadProducts()
  }, []);


  const cartItemsAmount = cart.reduce((sumAmount, product) => {
   const newSumAmount = {...sumAmount}
    newSumAmount[product.id] = product.amount
    console.log(newSumAmount)
    return newSumAmount
  }, {} as CartItemsAmount)

  function handleAddProduct(id: number) {
    addProduct(id)

  }

  const renderItems = (item: ProductFormatted) => {
    return(
      <li key={item.id}>
        <img src={item.image} />
        <strong>{item.title}</strong>
        <span>{formatPrice(item.price)}</span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={() => handleAddProduct(item.id)}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart size={16} color="#FFF" />
            {cartItemsAmount[item.id] || 0}
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    )
  }

  return (
    <ProductList>
      {products.map((item) => renderItems(item))}
    </ProductList>
  );
};

export default Home;
