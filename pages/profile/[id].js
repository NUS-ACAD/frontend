import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStoreState } from 'easy-peasy';
import classNames from 'classnames';
import Container from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import { getProfile } from '../../services/profile';
import SITE from '../../site.config';
import ProfilePictureHelper from '../../utils/profilePic';
import People from '../../assets/svgr/People';
import Button from '../../components/Button';
import PlanCard from '../../components/PlanCard';
import StatelessPlan from '../../components/Plan/StatelessPlan';

const colors = ['#fa8ef7', '#a5d2ee', '#e8bd4b', '#f098b1'];

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useStoreState((state) => state.user);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    let didCancel = false;

    const fetch = async () => {
      if (!id) return;
      await getProfile({ id })
        .then((profileData) => {
          if (!didCancel) {
            setData(profileData);
            setIsLoading(false);
            if (profileData.userPlans && profileData.userPlans.length > 0) {
              // Assumption: must have at least a primary plan
              setSelectedPlan(
                profileData.userPlans.filter((plan) => plan.isPrimary)[0],
              );
            }
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    fetch();

    return () => {
      didCancel = true;
    };
  }, [id]);

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  const onFollow = () => {
    // TODO:
  };

  // eslint-disable-next-line no-nested-ternary
  const plans = data?.userPlans?.sort((x, y) => (x === y ? 0 : x ? -1 : 1));

  const isSelf = data?.userData?.id === user.id;

  return (
    <Container
      title={`${data?.userData?.name ?? 'Profile'} | ${SITE.title}`}
      description={SITE.description}
    >
      <Sidebar>
        <div className="flex flex-col items-center mt-2">
          <div className="relative mb-4">
            <Image
              src={ProfilePictureHelper.getProfilePicture(data?.userData?.id)}
              alt="Profile"
              height={156}
              width={156}
              className="rounded-full profile-pic z-10"
            />
            <div
              className="rounded-full absolute top-0"
              style={{
                height: 156,
                width: 156,
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
            />
          </div>
          <h1 className="font-bold text-2xl mb-2">{data?.userData?.name}</h1>
          <div
            className="flex items-center text-sm mb-4"
            style={{ color: '#7B7B81' }}
          >
            <People className="mr-2" /> {data?.userData?.noOfFollowers}{' '}
            followers | {data?.userData?.noOfFollowing} following
          </div>
          {isSelf ? null : (
            <Button
              label="Follow"
              className="pink-button mb-6"
              onClick={onFollow}
            />
          )}
        </div>
        {(plans ?? []).map((plan) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={classNames('mx-4 cursor-pointer', {
              'is-dimmed': selectedPlan.id !== plan.id,
            })}
            key={plan.id}
            onClick={() => {
              setSelectedPlan(plan);
            }}
          >
            <PlanCard plan={plan} />
          </div>
        ))}
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mr-4 font-semibold mb-4">
          {/* eslint-disable-next-line no-nested-ternary */}
          {selectedPlan?.title
            ? selectedPlan.title
            : isSelf
            ? "You don't have a plan yet!"
            : 'This user does not have a plan yet!'}
        </motion.h1>
        <motion.h1 className="text-md mr-4 mb-8">
          {/* eslint-disable-next-line no-nested-ternary */}
          {selectedPlan?.description
            ? selectedPlan.description
            : isSelf
            ? 'Get started now!'
            : 'Perhaps you can let them witness your awesome plan?'}
        </motion.h1>
        {selectedPlan != null ? (
          <motion.div>
            <StatelessPlan plan={selectedPlan} />
          </motion.div>
        ) : null}
      </div>
    </Container>
  );
}

export default Profile;
