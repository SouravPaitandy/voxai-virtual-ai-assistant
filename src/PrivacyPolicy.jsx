import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import useForceScrollTop from './useForceScrollTop';

const PrivacyPolicy = () => {
  const { isDark } = useTheme();
  useForceScrollTop();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className={`inline-block mb-8 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition duration-300`}>
          <span className="mr-2">←</span> Back to Home
        </Link>
        <h1 className={`text-4xl font-bold text-center mb-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>1. Introduction</h2>
            <p>Welcome to VoxAI Assistant. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you use our service.</p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you use our voice assistant or contact us for support. This may include:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Voice data</li>
              <li>Text inputs</li>
              <li>Usage data</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Provide and improve our services</li>
              <li>Respond to your requests and inquiries</li>
              <li>Analyze usage patterns to enhance user experience</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: souravtempmail1@gmail.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;