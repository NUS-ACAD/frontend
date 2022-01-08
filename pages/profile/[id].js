import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    let didCancel = false;

    const fetch = async () => {
      if (!id) return;
      await getProfile({ id })
        .then((profileData) => {
          if (!didCancel) {
            setData(profileData);
            setIsLoading(false);
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

  const plan = data?.userPlan;

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
          <Button
            label="Follow"
            className="pink-button mb-6"
            onClick={onFollow}
          />
        </div>
        {plan && (
          <div className="mx-4">
            <PlanCard plan={plan} />
          </div>
        )}
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mr-4 font-semibold mb-4">
          {plan?.title}
        </motion.h1>
        <motion.h1 className="text-lg mr-4 mb-8">{plan?.description}</motion.h1>
        <motion.div>
          <StatelessPlan plan={plan} />
        </motion.div>
      </div>
    </Container>
  );
}

export default Profile;
