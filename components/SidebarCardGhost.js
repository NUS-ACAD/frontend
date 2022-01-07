import Skeleton from 'react-loading-skeleton';

function SidebarCardGhost({ height }) {
  return (
    <Skeleton
      height={height}
      borderRadius="0.5rem"
      className="flex flex-col rounded-lg sidebar-card"
    />
  );
}

export default SidebarCardGhost;
