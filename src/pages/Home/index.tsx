import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [stock, setStock] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))


  useEffect(() => {
    async function loadProducts() {
      axios.get('http://localhost:3333/products')
        .then((response) => {
          setProducts(response.data)
        })
    }
    loadProducts();
  }, []);


  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  // }, {} as CartItemsAmount)
  //
  // function handleAddProduct(id: number) {
  //   // TODO
  // }



  const renderItems = (item: ProductFormatted) => {
    return(
      <li key={item.id}>
        <img src={item.image} />
        <strong>{item.title}</strong>
        <span>{formatPrice(item.price)}</span>
        <button
          type="button"
          data-testid="add-product-button"
          // onClick={() => handleAddProduct(product.id)}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart size={16} color="#FFF" />
            {/*{cartItemsAmount[product.id] || 0}*/}
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
