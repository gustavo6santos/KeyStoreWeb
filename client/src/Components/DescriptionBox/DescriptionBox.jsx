import React, { useEffect, useState } from 'react';
import './DescriptionBox.css';
import star_icon from '../Assets/Web Icons/star_icon.png';
import star_dull from '../Assets/Web Icons/star_dull_icon.png';
import CompareSpecs from '../CompareSpecs/CompareSpecs';

const DescriptionBox = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({
    gameid: localStorage.getItem('gameid'), 
    userEmail: localStorage.getItem('userEmail'), 
    comment: '', 
    rating: ''
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3005/reviews/${localStorage.getItem('gameid')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/review/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        const reviewData = await response.json();
        setReviews((prevReviews) => [...prevReviews, reviewData]);
        setNewReview({
          gameid: localStorage.getItem('gameid'),
          userEmail: localStorage.getItem('userEmail'), 
          comment: '', 
          rating: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to submit review:', errorData.message || response.statusText);
        alert(`Failed to submit review: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`Error submitting review: ${error.message}`);
    }
  };

  useEffect(() => {
    if (activeTab === 'reviews') {
      fetchReviews();
    }
  }, [activeTab, localStorage.getItem('gameid')]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? star_icon : star_dull}
          alt={i <= rating ? 'star' : 'dull star'}
          className="star-icon"
        />
      );
    }
    return stars;
  };

  const game = {
    name: "Game Name", // You should replace this with actual game data
    cpuModel: "Intel i5",
    gpuModel: "NVIDIA GTX 1050",
    ram: "8 GB",
    ostype: "Windows 10",
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? '' : 'fade'}`}
          onClick={() => handleTabChange('description')}
        >
          Test Game
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? '' : 'fade'}`}
          onClick={() => handleTabChange('reviews')}
        >
          Reviews
        </div>
      </div>

      {activeTab === 'description' && (
        <CompareSpecs game={game} />
      )}

      {activeTab === 'reviews' && (
        <div className="descriptionbox-description">
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <>
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <p>{review.userEmail}</p>
                      {renderStars(review.rating)}
                    </div>
                    <hr />
                    <p><strong>{review.comment}</strong></p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
              <form onSubmit={handleReviewSubmit}>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  placeholder="Your comment"
                  required
                ></textarea>
                <input
                  type="number"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleInputChange}
                  placeholder="Your rating"
                  min="1"
                  max="5"
                  required
                />
                <button type="submit">Submit Review</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DescriptionBox;
