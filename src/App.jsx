import { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import WorldStockNewsCard from './components/WorldStockNewsCard.jsx';
import { legacyAppMarkup, legacyBodyClass } from './utils/legacyMarkup.js';

export default function App() {
  useLayoutEffect(() => {
    document.body.className = legacyBodyClass;

    const newsMount = document.getElementById('worldStockNewsMount');
    const newsRoot = newsMount ? createRoot(newsMount) : null;

    newsRoot?.render(<WorldStockNewsCard />);

    return () => {
      newsRoot?.unmount();
    };
  }, []);

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: legacyAppMarkup }} />;
}