/* eslint-disable react/prop-types */
import { Card, CardContent } from "../components"

const WelcomeScreen = ({handleNameSubmit, userName, setUserName}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <Card className="w-full max-w-md mx-4 bg-opacity-20 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 mb-2">
            Welcome to VoxAI
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300">
            Your personal voice assistant
          </p>
        </div>

        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!userName}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Start Conversation
          </button>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default WelcomeScreen