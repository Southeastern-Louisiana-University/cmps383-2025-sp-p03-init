import React, { useState } from 'react';

const MovieFeedbackPage = () => {
  const [formData, setState] = useState({
    name: '',
    email: '',
    age: '',
    movieTitle: '',
    rating: 0,
    subscriptionType: '',
    watchFrequency: '',
    deviceUsed: '',
    timeSpent: '',
    genres: [],
    feedbackText: '',
    improvements: '',
    recommendations: '',
    userExperience: '',
    technicalIssues: '',
    customerService: '',
    valueForMoney: '',
    contentQuality: '',
    platformEaseOfUse: '',
    comparisonWithOtherPlatforms: '',
    futureFeatures: '',
    newsletter: false,
    contactConsent: false,
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'genres') {
        // Handle multiple checkboxes for genres
        const updatedGenres = [...formData.genres];
        if (checked) {
          updatedGenres.push(value);
        } else {
          const index = updatedGenres.indexOf(value);
          if (index > -1) {
            updatedGenres.splice(index, 1);
          }
        }
        setState({ ...formData, genres: updatedGenres });
      } else {
        setState({ ...formData, [name]: checked });
      }
    } else {
      setState({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Here you would typically send the data to your backend
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setState({
      name: '',
      email: '',
      age: '',
      movieTitle: '',
      rating: 0,
      subscriptionType: '',
      watchFrequency: '',
      deviceUsed: '',
      timeSpent: '',
      genres: [],
      feedbackText: '',
      improvements: '',
      recommendations: '',
      userExperience: '',
      technicalIssues: '',
      customerService: '',
      valueForMoney: ''
      contentQuality: '',
      platformEaseOfUse: '',
      comparisonWithOtherPlatforms: '',
      futureFeatures: '',
      newsletter: false,
      contactConsent: false,
    });
    setSubmitted(false);
  };

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  // If form is submitted, show thank you message
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center space-y-6 py-12">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h2 className="text-3xl font-extrabold text-gray-900">Thank You For Your Feedback!</h2>
              <p className="text-lg text-gray-700 text-center max-w-md">
                We greatly appreciate your insights and will use them to improve our movie streaming service. Your opinion matters to us!
              </p>
              <button
                onClick={handleReset}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Submit Another Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">CineStream Feedback</h1>
          <p className="mt-2 text-blue-100">
            Help us improve your movie-watching experience
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-900">
                    Age Group
                  </label>
                  <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select age group</option>
                    <option value="Under 18">Under 18</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55+">55+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subscriptionType" className="block text-sm font-medium text-gray-900">
                    Subscription Type
                  </label>
                  <select
                    id="subscriptionType"
                    name="subscriptionType"
                    value={formData.subscriptionType}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select subscription</option>
                    <option value="Free Trial">Free Trial</option>
                    <option value="Basic Plan">Basic Plan</option>
                    <option value="Standard Plan">Standard Plan</option>
                    <option value="Premium Plan">Premium Plan</option>
                    <option value="Family Plan">Family Plan</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Movie Feedback Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Movie Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-900">
                    Last Movie Watched
                  </label>
                  <input
                    type="text"
                    id="movieTitle"
                    name="movieTitle"
                    value={formData.movieTitle}
                    onChange={handleChange}
                    placeholder="Enter movie title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-900">
                    Rating (1-10)
                  </label>
                  <div className="flex items-center mt-1">
                    <input
                      type="range"
                      id="rating"
                      name="rating"
                      min="1"
                      max="10"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{formData.rating || 0}</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="watchFrequency" className="block text-sm font-medium text-gray-900">
                    How often do you watch movies on our platform?
                  </label>
                  <select
                    id="watchFrequency"
                    name="watchFrequency"
                    value={formData.watchFrequency}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Several times a week">Several times a week</option>
                    <option value="Once a week">Once a week</option>
                    <option value="Few times a month">Few times a month</option>
                    <option value="Once a month">Once a month</option>
                    <option value="Rarely">Rarely</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="deviceUsed" className="block text-sm font-medium text-gray-900">
                    Primary Device Used
                  </label>
                  <select
                    id="deviceUsed"
                    name="deviceUsed"
                    value={formData.deviceUsed}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select device</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop/Desktop">Laptop/Desktop</option>
                    <option value="Smart TV">Smart TV</option>
                    <option value="Gaming Console">Gaming Console</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Favorite Movie Genres (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {genres.map(genre => (
                    <div key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`genre-${genre}`}
                        name="genres"
                        value={genre}
                        checked={formData.genres.includes(genre)}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`genre-${genre}`} className="ml-2 text-sm text-gray-900">
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Feedback Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Feedback</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-900 mb-1">
                    Overall Experience
                  </label>
                  <textarea
                    id="feedbackText"
                    name="feedbackText"
                    value={formData.feedbackText}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Please share your overall experience with our streaming service..."
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="contentQuality" className="block text-sm font-medium text-gray-900 mb-1">
                    Content Quality
                  </label>
                  <textarea
                    id="contentQuality"
                    name="contentQuality"
                    value={formData.contentQuality}
                    onChange={handleChange}
                    rows="3"
                    placeholder="How would you rate the quality of our movie selections? Are there enough new releases? Is the video quality satisfactory?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="platformEaseOfUse" className="block text-sm font-medium text-gray-900 mb-1">
                    Platform Ease of Use
                  </label>
                  <textarea
                    id="platformEaseOfUse"
                    name="platformEaseOfUse"
                    value={formData.platformEaseOfUse}
                    onChange={handleChange}
                    rows="3"
                    placeholder="How easy is it to navigate our platform? Can you easily find movies you're looking for? Does the search function work well?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="technicalIssues" className="block text-sm font-medium text-gray-900 mb-1">
                    Technical Issues
                  </label>
                  <textarea
                    id="technicalIssues"
                    name="technicalIssues"
                    value={formData.technicalIssues}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Have you experienced any technical issues? (buffering, login problems, app crashes, etc.)"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="customerService" className="block text-sm font-medium text-gray-900 mb-1">
                    Customer Service Experience
                  </label>
                  <textarea
                    id="customerService"
                    name="customerService"
                    value={formData.customerService}
                    onChange={handleChange}
                    rows="3"
                    placeholder="If you've contacted our customer service, please share your experience. Was your issue resolved promptly and satisfactorily?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="valueForMoney" className="block text-sm font-medium text-gray-900 mb-1">
                    Value for Money
                  </label>
                  <textarea
                    id="valueForMoney"
                    name="valueForMoney"
                    value={formData.valueForMoney}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Do you feel our subscription plans offer good value for money? How does it compare to other streaming services?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="comparisonWithOtherPlatforms" className="block text-sm font-medium text-gray-900 mb-1">
                    Comparison with Other Platforms
                  </label>
                  <textarea
                    id="comparisonWithOtherPlatforms"
                    name="comparisonWithOtherPlatforms"
                    value={formData.comparisonWithOtherPlatforms}
                    onChange={handleChange}
                    rows="3"
                    placeholder="How does our platform compare to other movie streaming services you've used? What do they do better or worse?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="improvements" className="block text-sm font-medium text-gray-900 mb-1">
                    Suggested Improvements
                  </label>
                  <textarea
                    id="improvements"
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleChange}
                    rows="3"
                    placeholder="What specific improvements would enhance your experience with our platform?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="recommendations" className="block text-sm font-medium text-gray-900 mb-1">
                    Movie Recommendations
                  </label>
                  <textarea
                    id="recommendations"
                    name="recommendations"
                    value={formData.recommendations}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Are there any movies or genres you'd like to see added to our platform?"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="futureFeatures" className="block text-sm font-medium text-gray-900 mb-1">
                    Future Features
                  </label>
                  <textarea
                    id="futureFeatures"
                    name="futureFeatures"
                    value={formData.futureFeatures}
                    onChange={handleChange}
                    rows="3"
                    placeholder="What new features would you like to see in our streaming service? (e.g., watch parties, interactive content, etc.)"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Consent Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="newsletter" className="text-sm text-gray-900">
                      I would like to receive newsletters and updates about new releases, special offers, and promotions.
                    </label>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="contactConsent"
                      name="contactConsent"
                      type="checkbox"
                      checked={formData.contactConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="contactConsent" className="text-sm text-gray-900">
                      I consent to be contacted by CineStream regarding my feedback and for further research purposes.
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setState({
                  name: '',
                  email: '',
                  age: '',
                  movieTitle: '',
                  rating: 0,
                  subscriptionType: '',
                  watchFrequency: '',
                  deviceUsed: '',
                  timeSpent: '',
                  genres: [],
                  feedbackText: '',
                  improvements: '',
                  recommendations: '',
                  userExperience: '',
                  technicalIssues: '',
                  customerService: '',
                  valueForMoney: '',
                  contentQuality: '',
                  platformEaseOfUse: '',
                  comparisonWithOtherPlatforms: '',
                  futureFeatures: '',
                  newsletter: false,
                  contactConsent: false,
                })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md shadow-md transition duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-400 text-sm">
        <p>Thank you for taking the time to provide your valuable feedback.</p>
        <p className="mt-1">© 2025 CineStream. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MovieFeedbackPage;