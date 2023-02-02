import { createRoot } from 'react-dom/client';
import { App } from './App';
import "./index.css";

export const API_BASE_URL = "https://api.mcs-rbg.de/betriebeboerse/"

createRoot(document.getElementById('root')!).render(
	<App />
);

document.getElementById('title')!.innerHTML = process.env.REACT_APP_NAME!