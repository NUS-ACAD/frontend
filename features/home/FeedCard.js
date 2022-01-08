import Image from 'next/image';
import ago from 's-ago';
import processActivity from '../../utils/processActivity';
import ProfilePictureHelper from '../../utils/profilePic';

const colors = ['#fa8ef7', '#a5d2ee', '#e8bd4b', '#f098b1'];

function FeedCard({ activity }) {
  const string = processActivity(activity);
  return (
    <div
      className="flex flex-col rounded-lg p-6 mt-2 mb-4 feed-card"
      style={{ backgroundColor: '#201F28' }}
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
              className="rounded-full absolute top-0 profile-pic-background"
              style={{
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
