export default function Navbar() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-bold">Task Manager</h1>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-2">
            <a className="text-sm text-gray-600 dark:text-gray-200 hover:underline" href="#">Home</a>
            <a className="text-sm text-gray-600 dark:text-gray-200 hover:underline" href="#posts">Posts</a>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-300">PLP MERN</span>
          </nav>
        </div>
      </div>
    </header>
  );
}