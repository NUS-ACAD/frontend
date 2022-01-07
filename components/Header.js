// Only used in pages/index.js
// All other pages will use the sidebar.

import Arrow from '../assets/svgr/ButtonArrow';

import Button from './Button';

function Header() {
  return (
    <div className="backdrop-blur-xl header fixed w-full py-4 px-4 md:px-24 flex items-center justify-between">
      <div className="font-black text-2xl">ACAD</div>
      <Button label="Login" icon={<Arrow />} className="blue-button" />
    </div>
  );
}

export default Header;
