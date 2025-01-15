

const LandingPage = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            AI-Assisted Heart Disease Predictor
          </h1>
          <p className="text-xl mb-8">
            Predict heart disease with cutting-edge AI technology. Early detection saves lives.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Step 1: Input Data</h3>
              <p className="text-gray-600">
                Enter your health data including age, cholesterol levels, and more.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Step 2: AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your data using advanced algorithms.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Step 3: Get Results</h3>
              <p className="text-gray-600">
                Receive a detailed report on your heart disease risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="User 1"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">John Doe</h3>
              <p className="text-gray-600">
                "This tool helped me understand my risk and take preventive measures."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="User 2"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">Jane Smith</h3>
              <p className="text-gray-600">
                "The AI analysis was incredibly accurate and easy to understand."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="User 3"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">Mike Johnson</h3>
              <p className="text-gray-600">
                "I highly recommend this tool to anyone concerned about heart health."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Understanding Heart Disease</h3>
              <p className="text-gray-600">
                Learn about the risk factors and how to manage them.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">AI in Healthcare</h3>
              <p className="text-gray-600">
                Discover how AI is revolutionizing the healthcare industry.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Preventive Measures</h3>
              <p className="text-gray-600">
                Tips and strategies to prevent heart disease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 AI Heart Disease Predictor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;