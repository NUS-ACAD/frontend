const processActivity = (activity, isMe = false) => {
  switch (activity.activityType) {
    case 'welcome':
      return 'Welcome to ACAD! We look forward to having an awesome journey with you here!';
    case 'created_plan':
      return `${isMe ? 'You' : activity.userName} created a new plan ${
        activity.planName
      }.`;
    case 'forked_plan':
      return `${isMe ? 'You' : activity.userName} forked a new plan ${
        activity.planName
      } from ${activity.secondPlanName}.`;
    case 'updated_plan':
      return `${isMe ? 'You' : activity.userName} updated plan ${
        activity.planName
      }.`;
    case 'deleted_plan':
      return `${isMe ? 'You' : activity.userName} deleted plan ${
        activity.planName
      }.`;
    case 'changed_group':
      return `${isMe ? 'You' : activity.userName} joined the group ${
        activity.groupName
      }.`;
    case 'deleted_group':
      return `${isMe ? 'You' : activity.userName} deleted the group ${
        activity.groupName
      }.`;
    case 'changed_primary_plan':
      return `${isMe ? 'You have' : `${activity.userName} has`} set ${
        activity.planName
      } ${isMe ? 'your' : 'their'} primary plan.`;
    default:
      return '';
  }
};

export default processActivity;
