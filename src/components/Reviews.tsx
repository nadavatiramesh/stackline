import React from 'react';

interface SaleItem {
	retailSales: number
	retailerMargin: number
	unitsSold: number
	weekEnding: string
	wholesaleSales: number
}

interface ReviewProps {
	reviews: [SaleItem];
}
const Reviews = (props: ReviewProps) => {
	return (
		<div className='reviews-data'>
			<h3>Reviews</h3>
			{
				props.reviews.map((review: any, index: number) => {
					return (
						<div key={index} className='review-wrapper'>
							<div className='review-score'>
								<div className='score'>{review.score}</div>
								<div className='customer-name'>{review.customer}</div>
							</div>
							<div className='review-description'>
								{review.review}
							</div>
						</div>
					)
				})
			}
		</div>
	);
};

export default Reviews;

