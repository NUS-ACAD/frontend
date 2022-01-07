import { SkeletonTheme } from 'react-loading-skeleton';
import '../styles/globals.css';
// eslint-disable-next-line import/imports-first
import 'react-loading-skeleton/dist/skeleton.css';

function MyApp({ Component, pageProps }) {
  // TODO: Add providers here
  return (
    <SkeletonTheme baseColor="#1B1923" highlightColor="#282131">
      <Component {...pageProps} />
    </SkeletonTheme>
  );
}

export default MyApp;
