import { hydrateRoot } from 'react-dom/client';
import RootLayout from './RootLayout';

// Import your CSS
import './styles.css';

// Ensure the root element exists in your HTML template
const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(rootElement, <RootLayout />);
}
