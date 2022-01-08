import { motion } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import GroupCard from '../../components/GroupCard';
import PlanCard from '../../components/PlanCard';
import SidebarCardGhost from '../../components/SidebarCardGhost';
import Plus from '../../assets/svgr/Plus';
import MyActivity from './MyActivity';

const generateAnim = (delay) => ({
  hidden: {
    x: -50,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    x: 0,
    transition: {
      duration: 2.5,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
      delay,
    },
  },
});

function SidebarContent({ plan, group, activities, isLoading }) {
  const user = useStoreState((state) => state.user);

  return (
    <SkeletonTheme baseColor="#201F28" highlightColor="#332D3B">
      <motion.h2
        variants={generateAnim(0.1)}
        initial="hidden"
        animate="show"
        className="font-bold mx-4 mb-2 text-lg flex items-center"
        style={{ color: '#7B7B81' }}
      >
        PLANS{' '}
        <Link href="/plan/create" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <Plus className="ml-1" />
          </a>
        </Link>
      </motion.h2>
      <motion.div
        variants={generateAnim(0.2)}
        initial="hidden"
        animate="show"
        className="mx-4 mb-2"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <SidebarCardGhost height={108} />
        ) : plan == null ? (
          <div className="text-sm" style={{ color: '#7B7B81' }}>
            You don&apos;t have any academic plans! Create one or fork one now!
          </div>
        ) : (
          <PlanCard plan={plan} />
        )}
      </motion.div>
      <motion.div
        variants={generateAnim(0.3)}
        initial="hidden"
        animate="show"
        className="mx-4 mb-4 text-xs"
        style={{ color: '#E17D8A' }}
      >
        <Link href={`/profile/${user.id}`} passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>View More</a>
        </Link>
      </motion.div>
      <motion.h2
        variants={generateAnim(0.4)}
        initial="hidden"
        animate="show"
        className="font-bold mx-4 mb-2 text-lg flex items-center"
        style={{ color: '#7B7B81' }}
      >
        GROUPS <Plus className="ml-1" />
      </motion.h2>
      <motion.div
        variants={generateAnim(0.5)}
        initial="hidden"
        animate="show"
        className="mx-4 mb-2"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <SidebarCardGhost height={108} />
        ) : group == null ? (
          <div className="text-sm" style={{ color: '#7B7B81' }}>
            You&apos;re not in any groups! Create one or join one now!
          </div>
        ) : (
          <GroupCard group={group} />
        )}
      </motion.div>
      <motion.div
        variants={generateAnim(0.6)}
        initial="hidden"
        animate="show"
        className="mx-4 mb-4 text-xs"
        style={{ color: '#E17D8A' }}
      >
        View More
      </motion.div>
      <motion.h2
        variants={generateAnim(0.7)}
        initial="hidden"
        animate="show"
        className="font-bold mx-4 mb-2 text-lg"
        style={{ color: '#7B7B81' }}
      >
        RECENT ACTIVITY
      </motion.h2>
      {!isLoading &&
        activities?.slice(0, 3)?.map((activity, index) => (
          <motion.div
            variants={generateAnim(0.8 + index * 0.1)}
            initial="hidden"
            animate="show"
            className="mx-4 mb-2"
            key={activity.id}
          >
            <MyActivity activity={activity} isLast={index === 2} />
          </motion.div>
        ))}
      {!isLoading && (!activities || activities.length === 0) && (
        <motion.div
          variants={generateAnim(0.8)}
          initial="hidden"
          animate="show"
          className="mx-4 mb-2 text-sm"
          style={{ color: '#7B7B81' }}
        >
          You have no recent activity! Get started by doing (literally) anything
          now!
        </motion.div>
      )}
    </SkeletonTheme>
  );
}

export default SidebarContent;
