import React, { useEffect, useState } from 'react';
import './DescriptionBox.css'; // Import the CSS file
import star_icon from '../Assets/Web Icons/star_icon.png';
import star_dull from '../Assets/Web Icons/star_dull_icon.png';
import CompareSpecs from '../CompareSpecs/CompareSpecs';


const DescriptionBox = ({ game, userSpecs }) => {

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

  const testCompatibility = () => {
    // Implement the functionality to test compatibility
    alert('Compatibility tested!');
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

        <div>

          <h1>Recommended Specs</h1>

          <div>

            <label htmlFor="cpu">CPU:</label>

            <div id="cpu">{game.cpuModel}</div>

          </div>

          <div>

            <label htmlFor="gpu">GPU:</label>

            <div id="gpu">{game.gpuModel}</div>

          </div>

          <div>

            <label htmlFor="ram">RAM:</label>

            <div id="ram">{game.ram} GB</div>

          </div>

          <div>

            <label htmlFor="os">OS Type:</label>

            <div id="os">{game.ostype}</div>

          </div>


          {/* Render user specs */}

          <div>

            <h2>User Specifications</h2>

            <div>

              <label htmlFor="cpu">CPU:</label>

              <div id="cpu">{userSpecs.cpuModel}</div>

            </div>

            <div>

              <label htmlFor="gpu">GPU:</label>

              <div id="gpu">{userSpecs.gpuModel}</div>

            </div>

            <div>

              <label htmlFor="ram">RAM:</label>

              <div id="ram">{userSpecs.ram} GB</div>

            </div>

            <div>

              <label htmlFor="os">OS Type:</label>

              <div id="os">{userSpecs.ostype}</div>

            </div>

          </div>


          <button onClick={testCompatibility}>Test Compatibility</button>

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
};

export default DescriptionBox;