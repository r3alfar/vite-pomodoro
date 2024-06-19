import DefaultNav from './defaultNav'
import MobileNav from './mobileNav'

function MyNavbar() {
  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4 justify-center">
        <DefaultNav />
        <MobileNav />
      </div>
    </header>
  )
}

export default MyNavbar