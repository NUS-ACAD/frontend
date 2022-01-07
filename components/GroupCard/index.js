import People from '../../assets/svgr/People';

function GroupCard({ group }) {
  return (
    <div
      className="flex flex-col p-2 rounded-lg sidebar-card"
      style={{ backgroundColor: '#201F28' }}
    >
      <div className="text-s font-semibold mb-2 sidebar-card-title">
        {group.name}
      </div>
      <div className="text-xs mb-2">{group.description}</div>
      <div className="flex">
        <div className="flex text-xs" style={{ color: '#7B7B81' }}>
          <People className="mr-1" /> {group.members}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
