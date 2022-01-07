import Link from 'next/link';
import SITE from '../../site.config';

import GitHub from '../../assets/svgr/GitHub';

function Footer() {
  return (
    <div className="w-full px-4 md:px-32 flex justify-center">
      <footer className="w-full mt-4 mb-6 max-w-screen-2xl">
        <div className="w-full flex items-center justify-between">
          <div className="font-black text-2xl">ACAD</div>
          <Link href={`mailto:${SITE.contactEmail}`} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="font-semibold text-md">Contact</a>
          </Link>
        </div>
        <div className="my-6 footer-divider w-full">&nbsp;</div>
        <div className="w-full flex items-center justify-between">
          <a
            className="opacity-40"
            href={SITE.gitHubURL}
            target="_blank"
            rel="noreferrer"
            style={{ height: 25, width: 25 }}
          >
            <GitHub />
          </a>
          <div className="font-semibold text-xs opacity-40">
            Made with <span>❤️</span> for Hack&Roll 2022.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
