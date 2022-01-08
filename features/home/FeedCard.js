import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ago from 's-ago';
import processActivity from '../../utils/processActivity';
import ProfilePictureHelper from '../../utils/profilePic';

const colors = ['#fa8ef7', '#a5d2ee', '#e8bd4b', '#f098b1'];

function FeedCard({ activity }) {
  const string = processActivity(activity);
  const router = useRouter();
  const handleRedirect = () => {
    switch (activity.activityType) {
      case 'created_plan':
      case 'forked_plan':
      case 'updated_plan':
      case 'deleted_plan':
      case 'changed_primary_plan':
      case 'welcome':
        router.push(`/profile/${activity.userId}`);
        break;
      default:
      // no-op
    }
  };
  const canRedirect = () => {
    [
      'created_plan',
      'forked_plan',
      'updated_plan',
      'deleted_plan',
      'changed_primary_plan',
      'welcome',
    ].includes(activity.activityType);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,  jsx-a11y/no-static-element-interactions
    <div
      className={classNames('flex flex-col rounded-lg p-6 mb-4 feed-card', {
        'cursor-pointer': canRedirect(),
      })}
      style={{ backgroundColor: '#201F28' }}
      onClick={handleRedirect}
    >
      <div className="text-sm flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={ProfilePictureHelper.getProfilePicture(activity.userId)}
              alt="Profile"
              height={35}
              width={35}
              className="rounded-full profile-pic z-10"
            />
            <div
              className="rounded-full absolute top-0"
              style={{
                height: 35,
                width: 35,
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
            />
          </div>
          <h3 className="ml-3 font-bold">{activity.userName ?? 'Username'}</h3>
        </div>
        <div style={{ color: '#7B7B81' }}>
          {ago(new Date(activity.createdAt))}
        </div>
      </div>
      <div className="text-sm">{string}</div>
    </div>
  );
}

export default FeedCard;
