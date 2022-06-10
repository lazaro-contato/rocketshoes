import React, {useEffect, useState} from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';
import {ProductFormatted} from "../Home";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [products, setProducts] = useState<ProductFormatted[]>([]);


  useEffect(() => {
    async function loadProducts() {
      axios.get('http://localhost:3333/products')
        .then((response) => {
          setProducts(response.data)
        })
    }
    loadProducts();
  }, []);


  // const cartFormatted = cart.map(product => ({
  //   // TODO
  // }))
  // const total =
  //   formatPrice(
  //     cart.reduce((sumTotal, product) => {
  //       // TODO
  //     }, 0)
  //   )

  function handleProductIncrement(product: Product) {
    // TODO
  }

  function handleProductDecrement(product: Product) {
    // TODO
  }

  function handleRemoveProduct(productId: number) {
    // TODO
  }

  const renderItem = (item: Product) => {
    const itemId = item.id
    const currentProduct = {...products[itemId]}

    return (
      <>
        <tr data-testid="product">
          <td>
            <img src={currentProduct.image} alt={currentProduct.title} />
          </td>
          <td>
            <strong>{currentProduct.title}</strong>
            <span>{formatPrice(currentProduct.price)}</span>
          </td>
          <td>
            <div>
              <button
                type="button"
                data-testid="decrement-product"
                // disabled={product.amount <= 1}
                // onClick={() => handleProductDecrement()}
              >
                <MdRemoveCircleOutline size={20} />
              </button>
              <input
                type="text"
                data-testid="product-amount"
                readOnly
                value={item.amount}
              />
              <button
                type="button"
                data-testid="increment-product"
                // onClick={() => handleProductIncrement()}
              >
                <MdAddCircleOutline size={20} />
              </button>
            </div>
          </td>
          <td>
            <strong>{formatPrice(currentProduct.price)}</strong>
          </td>
          <td>
            <button
              type="button"
              data-testid="remove-product"
              // onClick={() => handleRemoveProduct(product.id)}
            >
              <MdDelete size={20} />
            </button>
          </td>
        </tr>
      </>
    )
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
          {cart.map(item => renderItem(item))}
        </thead>
        <tbody>

        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ 359,80</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
