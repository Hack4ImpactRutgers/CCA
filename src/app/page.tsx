"use client";
import { BrowserRouter } from '../../node_modules/react-router-dom/dist/index'
import Header from './components/Header/Header'

export default function Home() {
  return (
    <BrowserRouter>
    <Header/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
    </BrowserRouter>
  )
}
