import { createContext, useReducer, ReactNode, useCallback, useContext } from 'react';

type Theme = 'light' | 'dark';

type State = {
  theme: Theme;
  isLoading: boolean;
  error: string | null;
  currentArtist: string | null;
};

type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_ARTIST'; payload: string | null };

const initialState: State = {
  theme: 'light',
  isLoading: false,
  error: null,
  currentArtist: null,
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CURRENT_ARTIST':
      return { ...state, currentArtist: action.payload };
    default:
      return state;
  }
}

type AppContextType = {
  state: State;
  toggleTheme: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentArtist: (artistId: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setCurrentArtist = useCallback((artistId: string | null) => {
    dispatch({ type: 'SET_CURRENT_ARTIST', payload: artistId });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        toggleTheme,
        setLoading,
        setError,
        setCurrentArtist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
