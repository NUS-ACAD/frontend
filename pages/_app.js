import { SkeletonTheme } from 'react-loading-skeleton';
import { StoreProvider } from 'easy-peasy';
import 'react-loading-skeleton/dist/skeleton.css';

import store from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // TODO: Add providers here
  return (
    <StoreProvider store={store}>
      <SkeletonTheme baseColor="#1B1923" highlightColor="#282131">
        <Component {...pageProps} />
      </SkeletonTheme>
    </StoreProvider>
  );
}

export default MyApp;
