import React, { useEffect, useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/reviews/${props.gameId}`);
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

  useEffect(() => {
    if (activeTab === 'reviews') {
      fetchReviews();
    }
  }, [activeTab, props.gameId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? '' : 'fade'}`}
          onClick={() => handleTabChange('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? '' : 'fade'}`}
          onClick={() => handleTabChange('reviews')}
        >
          Reviews
        </div>
      </div>

      {activeTab === 'description' && (
        <div className="descriptionbox-description">
          <p>{props.description}</p>
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
                    <p><strong>{review.comment}</strong></p>
                    <p>{review.rating}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DescriptionBox;
