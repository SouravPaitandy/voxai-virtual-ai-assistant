/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback } from 'react';

const MemoryContext = createContext();

const MEMORY_ACTIONS = {
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  ADD_TO_MEMORY: 'ADD_TO_MEMORY',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  CLEAR_MEMORY: 'CLEAR_MEMORY',
};

const initialState = {
  recentTopics: [],
  conversationMemory: [],
  userPreferences: {},
  lastQuery: null,
  contextualMemory: new Map(),
  sessionStartTime: new Date(),
  messageCount: 0
};

const memoryReducer = (state, action) => {
  switch (action.type) {
    case MEMORY_ACTIONS.UPDATE_CONTEXT:
      return {
        ...state,
        recentTopics: [
          action.payload.topic,
          ...state.recentTopics.slice(0, 4)
        ],
        lastQuery: action.payload.query,
        messageCount: state.messageCount + 1
      };

    case MEMORY_ACTIONS.ADD_TO_MEMORY: {
      const newMemory = {
        id: Date.now(),
        timestamp: new Date(),
        ...action.payload
      };
      
      // Update contextual memory
      const contextKey = action.payload.context || 'general';
      const existingContextMemory = state.contextualMemory.get(contextKey) || [];
      
      return {
        ...state,
        conversationMemory: [
          ...state.conversationMemory,
          newMemory
        ].slice(-50), // Keep last 50 conversations
        contextualMemory: new Map(state.contextualMemory).set(
          contextKey,
          [...existingContextMemory, newMemory].slice(-10) // Keep last 10 per context
        )
      };
    }

    case MEMORY_ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload
        }
      };

    case MEMORY_ACTIONS.CLEAR_MEMORY:
      return {
        ...initialState,
        userPreferences: state.userPreferences,
        sessionStartTime: state.sessionStartTime
      };

    default:
      return state;
  }
};

export const MemoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memoryReducer, initialState);

  const updateContext = useCallback((query, topic = null) => {
    dispatch({
      type: MEMORY_ACTIONS.UPDATE_CONTEXT,
      payload: {
        query,
        topic: topic || extractTopicFromQuery(query)
      }
    });
  }, []);

  const addToMemory = useCallback((message, context = 'general') => {
    dispatch({
      type: MEMORY_ACTIONS.ADD_TO_MEMORY,
      payload: {
        message,
        context,
        topic: extractTopicFromQuery(message)
      }
    });
  }, []);

  const updatePreferences = useCallback((prefs) => {
    dispatch({
      type: MEMORY_ACTIONS.UPDATE_PREFERENCES,
      payload: prefs
    });
  }, []);

  const clearMemory = useCallback(() => {
    dispatch({ type: MEMORY_ACTIONS.CLEAR_MEMORY });
  }, []);

  const getContextMemory = useCallback((context) => {
    return state.contextualMemory.get(context) || [];
  }, [state.contextualMemory]);

  const getRecentTopics = useCallback(() => {
    return state.recentTopics;
  }, [state.recentTopics]);

  const value = {
    state,
    updateContext,
    addToMemory,
    updatePreferences,
    clearMemory,
    getContextMemory,
    getRecentTopics
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};

// Helper function to extract topic from query
const extractTopicFromQuery = (query) => {
  const topics = {
    weather: /weather|temperature|forecast/i,
    time: /time|clock|date/i,
    calculator: /calculate|math|sum|multiply|divide/i,
    system: /open|launch|start|close/i,
    general: /.*/ // Default topic
  };

  for (const [topic, pattern] of Object.entries(topics)) {
    if (pattern.test(query)) {
      return topic;
    }
  }
  return 'general';
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};