import React, { useState } from 'react'
import ProductList from './ProductList';
import productList from './data.json'
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const BTShoeShop = () => {
    const [productDetail, setProductDetail] = useState(productList[0])

    const [carts, setCarts] = useState([]) // tham chiếu #123
    // console.log('carts: ', carts)

    const handleProductDetail = (product) => {
        setProductDetail(product)
    }

    const handleCarts = (product) => {
        console.log('product: ', product)
        // setCarts(data)
        setCarts((currentState) => {
            //#123
            //Kiểm tra trong carts đã tồn tại sản phẩm hay chưa
            const index = currentState.findIndex((item) => item.id === product.id)

            if (index !== -1) {
                //SP đã tồn tại trong carts => tăng số lượng của sp đó lên
                currentState[index].cartQuantity += 1
            } else {
                currentState.push({ ...product, cartQuantity: 1 })
            }
            return [...currentState]
        })
    }

    const handleCartQuantity = (id, quantity) => {
        // quantiy: +1 => button +
        // quantity: -1:  => button -
        setCarts((currentState) => {
            // Tìm kiếm sản phẩm đang muốn tăng giảm số lượng
            const index = currentState.findIndex((item) => item.id === id)

            currentState[index].cartQuantity = currentState[index].cartQuantity + quantity || 1

            return [...currentState]
        })
    }
    const handleDeleteCart = (id) => {
        setCarts((currentState) => {
            return currentState.filter((item) => item.id !== id)
        })
    }
    return (
        <div>
            <h1>BTShoeShop</h1>
            <button
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#carts"
            >
                Cart
            </button>
            <ProductList productList={productList}
                handleProductDetail={handleProductDetail}
                handleCarts={handleCarts}>
            </ProductList>

            {/* Modal detail */}
            <ProductDetail productDetail={productDetail} />
            {/* Modal Giỏ hàng */}
            <Cart carts={carts}
                handleCartQuantity={handleCartQuantity}
                handleDeleteCart={handleDeleteCart} />
        </div>
    )
}

export default BTShoeShop