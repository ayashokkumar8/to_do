import { Outlet } from 'react-router-dom'

export default function InnerContent() {
  return (
    <div className='inner-content'><Outlet/></div>
  )
}
