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
import {api} from "../../services/api";

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
      const response = await api.get<Product[]>('products')
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      setProducts(data)
    }
    loadProducts()
  }, []);


  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount
      }, 0)
    )

  function handleProductIncrement(product: Product) {
    updateProductAmount({
      productId: product.id, amount: product.amount + 1
    })
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({
      productId: product.id, amount: product.amount - 1
    })
  }

  function handleRemoveProduct(productId: number) {
    removeProduct((productId))
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
                disabled={item.amount <= 1}
                onClick={() => handleProductDecrement(item)}
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
                onClick={() => handleProductIncrement(item)}
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
              onClick={() => handleRemoveProduct(item.id)}
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
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
