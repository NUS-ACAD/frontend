// Only used in pages/index.js
// All other pages will use the sidebar.

function Header() {
  return (
    <div className="backdrop-blur-xl header fixed w-full py-6 px-4 md:px-24 flex justify-between">
      <div className="font-black text-2xl">ACAD</div>
      {/* TODO: Add login button */}
    </div>
  );
}

export default Header;
