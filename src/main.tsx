import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { Providers } from './common/components/providers.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>,
)
