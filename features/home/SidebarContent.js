import { motion } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import GroupCard from '../../components/GroupCard';
import PlanCard from '../../components/PlanCard';

function SidebarContent({ plan, group }) {
  return (
    <SkeletonTheme baseColor="#201F28" highlightColor="#282131">
      <motion.h2
        className="font-bold mx-4 mb-2 text-lg"
        style={{ color: '#7B7B81' }}
      >
        PLANS
      </motion.h2>
      <motion.div className="mx-4 mb-2">
        <PlanCard plan={plan} />
      </motion.div>
      <motion.div className="mx-4 mb-4 text-xs" style={{ color: '#E17D8A' }}>
        View More
      </motion.div>
      <motion.h2
        className="font-bold mx-4 mb-2 text-lg"
        style={{ color: '#7B7B81' }}
      >
        GROUPS
      </motion.h2>
      <motion.div className="mx-4 mb-2">
        <GroupCard group={group} />
      </motion.div>
      <motion.div className="mx-4 mb-4 text-xs" style={{ color: '#E17D8A' }}>
        View More
      </motion.div>
      <motion.h2
        className="font-bold mx-4 mb-2 text-lg"
        style={{ color: '#7B7B81' }}
      >
        RECENT ACTIVITY
      </motion.h2>
      <motion.div className="mx-4 mb-2">Activity Row</motion.div>
      <motion.div className="mx-4 mb-2">Activity Row</motion.div>
      <motion.div className="mx-4 mb-2">Activity Row</motion.div>
    </SkeletonTheme>
  );
}

export default SidebarContent;
