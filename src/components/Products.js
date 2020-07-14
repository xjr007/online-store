import React, { Component } from 'react';
import { formatCurrency } from '../util';

export default class Products extends Component {
	render() {
		return (
			<div>
				<ul className='products'>
					{this.props.products.map(product => (
						<li key={product._id}>
							<div className='product'>
								<a href={'#' + product._id}>
									<img src='https://i.pravatar.cc/300' alt={product.title}></img>
									<p>{product.title}</p>
								</a>
								<div className='product-price'>{formatCurrency(product.price)}</div>
								<button className='button primary'>Add To Cart</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
