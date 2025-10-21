import { LoaderIcon } from 'lucide-react'


const PageLoader = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<LoaderIcon className='size-10 animate-spin text-slate-400' />
		</div>
	)
}

export default PageLoader