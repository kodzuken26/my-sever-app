import Image from 'next/image';
import "./rate.css"

export default function RateProduct({ product }) {
    if (!product) {
        return <div>Информация о товаре не доступна</div>;
    }

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };


    product.reviews?.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            ratingCounts[review.rating]++;
        }
    });

    return (
        <div className="otzyv-full">
            <div className="rating-distribution">
                <div className="rating-top">
                    {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                        <span key={index} style={{ color: '#ffd700', fontSize: '18px' }}><Image src="/yellow-star.svg" width={20} height={20} alt='yellow-star' /></span>
                    ))}
                    {Array.from({ length: 5 - Math.floor(product.rating) }).map((_, index) => (
                        <span key={index} style={{ color: '#ccc', fontSize: '18px' }}><Image src="/grey-star.svg" width={20} height={20} alt='grey-star' /></span>
                    ))}
                    <span className="rating-top-text">{product.rating} из 5 </span>
                </div>
                {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="rating-row">
                        <span className="rating-number">{rating}</span>

                        <div className="stars-container">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    key={index}
                                    src={
                                        index < rating
                                            ? '/yellow-star.svg'
                                            : '/grey-star.svg'
                                    }
                                    alt={index < rating ? 'filled star' : 'empty star'}
                                    width={16}
                                    height={16}
                                    className="star-image"
                                />
                            ))}
                        </div>
                        <span className="review-count">
                            {ratingCounts[rating]}
                        </span>
                    </div>
                ))}
            </div>
            <div>
                <div>

                    <div className="reviews-list">
                        {product.reviews?.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-header">
                                    <Image src="/user-rate.svg" width={36} height={36} alt='user' />
                                    <span className="reviewer-name">{review.reviewerName}</span>
                                </div>
                                <div className="review-content">
                                    <p className="review-stars">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Image
                                                key={i}
                                                src={i < review.rating ? '/yellow-star.svg' : '/grey-star.svg'}
                                                alt={i < review.rating ? 'filled star' : 'empty star'}
                                                width={20}
                                                height={20}
                                            />
                                        ))}
                                    </p>
                                    <p className="review-date">
                                        {new Date(review.date).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                                <div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                        <div>
                            <p className="user-rate"><span>Ваша оценка </span>
                                <Image src="/grey-star.svg" width={24} height={24} alt='star' />
                                <Image src="/grey-star.svg" width={24} height={24} alt='star' />
                                <Image src="/grey-star.svg" width={24} height={24} alt='star' />
                                <Image src="/grey-star.svg" width={24} height={24} alt='star' />
                                <Image src="/grey-star.svg" width={24} height={24} alt='star' />
                            </p>
                            <textarea
                                placeholder="Отзыв"
                                className="textarea-placeholder"
                                rows={4}
                            /> <br />
                            <button className="btn-otzyv">Отправить отзыв</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}