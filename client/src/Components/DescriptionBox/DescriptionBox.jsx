import React, { useEffect, useState } from 'react';
import './DescriptionBox.css'; // Import the CSS file
import star_icon from '../Assets/Web Icons/star_icon.png';
import star_dull from '../Assets/Web Icons/star_dull_icon.png';
import CompareSpecs from '../CompareSpecs/CompareSpecs';

const DescriptionBox = ({ game }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({
    gameid: localStorage.getItem('gameid'),
    userEmail: localStorage.getItem('userEmail'),
    comment: '',
    rating: '',
  });

  const [userData, setUserData] = useState(null);
  const [compatibilityMessage, setCompatibilityMessage] = useState('');

  const fetchCompatibility = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const gameId = localStorage.getItem('gameid');
    if (!userEmail || !gameId) {
      alert('User email or game ID not found in local storage');
      return;
    }
    try {
      const response = await fetch('http://localhost:3002/game/GameCompatibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          gameid: gameId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to test compatibility');
      }
      const data = await response.json();
      // Update the compatibility message state with the received data
      setCompatibilityMessage(data);
    } catch (error) {
      console.error('Error testing compatibility:', error);
      alert('Error testing compatibility. Please try again later.');
    }
  };

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

  const fetchUserSpecs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/user/verify/${localStorage.getItem('userEmail')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user specs');
      }
      const userData = await response.json();
      setUserData(userData.specs); // Extracting user specs from userData
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user specs:', error);
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
          rating: '',
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
    } else if (activeTab === 'description') {
      fetchUserSpecs();
    }
  }, [activeTab]);

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

  return (
    <div className="descriptionbox">
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

      {game.category === 'Pc' && (
  <>
    {activeTab === 'description' && (
      <div className="recommended-specs">
        <h1>Recommended Specs</h1>
        <div className="spec-item">
          <span className="spec-label">CPU:</span>
          <div className="spec-value">{game.cpuModel}</div>
        </div>
        <div className="spec-item">
          <span className="spec-label">GPU:</span>
          <div className="spec-value">{game.gpuModel}</div>
        </div>
        <div className="spec-item">
          <span className="spec-label">RAM:</span>
          <div className="spec-value">{game.ram} GB</div>
        </div>
        <div className="spec-item">
          <span className="spec-label">OS Type:</span>
          <div className="spec-value">{game.ostype}</div>
        </div>
        <div className="test-compatibility">
          <button onClick={fetchCompatibility}>Test Game Compatibility</button>
          {compatibilityMessage && (
            <div className="compatibility-results">
              <h2>Compatibility Test Results</h2>
              <p>
                <span className="bold-text">CPU:</span> {compatibilityMessage.cpuSubtitle}
              </p>
              <p>
                <span className="bold-text">GPU:</span> {compatibilityMessage.gpuSubtitle}
              </p>
              <p>
                <span className="bold-text">RAM:</span> {compatibilityMessage.ramSubtitle}
              </p>
              <p>
                <span className="bold-text">OS:</span> {compatibilityMessage.osMatch.osSubtitle}
              </p>
            </div>
          )}
        </div>
      </div>
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
                        <p>
                          <strong>{review.comment}</strong>
                        </p>
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
        </>
      )}

      {game.category !== 'Pc' && activeTab === 'reviews' && (
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
                    <p>
                      <strong>{review.comment}</strong>
                    </p>
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
};

export default DescriptionBox;
