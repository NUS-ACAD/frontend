import Star from '../../assets/svgr/Star';
import Fork from '../../assets/svgr/Fork';

function PlanCard({ plan }) {
  return (
    <div
      className="flex flex-col p-2 rounded-lg sidebar-card"
      style={{ backgroundColor: '#201F28' }}
    >
      <div className="text-s font-semibold mb-2 sidebar-card-title">
        {plan.name}
      </div>
      <div className="text-xs mb-2">{plan.description}</div>
      <div className="flex">
        <div className="flex mr-2 text-xs" style={{ color: '#7B7B81' }}>
          <Star className="mr-1" /> {plan.likes}
        </div>
        <div className="flex text-xs" style={{ color: '#7B7B81' }}>
          <Fork className="mr-1" /> {plan.forks}
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
