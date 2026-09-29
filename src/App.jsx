
import './App.css'
import Result from './components/Result'
import TripForm from './components/TripForm'

function App() {

  return (
    <div className='bg-slate-50'>
        <div className='max-w-6xl mx-auto p-3 sm:p-6 md:p-10 lg:px-6'>
			<h1 className="text-amber-700 text-3xl font-bold">TravelFit</h1>
			<h2 className='text-amber-700 text-md tracking-wide'>Your Trip . Your Weather . Your Wardrobe</h2>
			<TripForm />
          	<Result />
        </div>
    </div>
    
  )
}

export default App
