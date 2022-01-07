import Skeleton from 'react-loading-skeleton';

function PlanCardGhost() {
  return (
    <div
      className="flex flex-col p-2 rounded-lg plan-card"
      style={{ backgroundColor: '#201F28' }}
    >
      <div className="text-s font-semibold mb-2">
        <Skeleton />
      </div>
      <div className="text-xs mb-2">
        <Skeleton />
      </div>
      <div className="flex">
        <div className="flex mr-2 text-xs">
          <Skeleton />
        </div>
        <div className="flex text-xs">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}

export default PlanCardGhost;
