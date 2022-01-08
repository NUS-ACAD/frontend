import classNames from 'classnames';
import processActivity from '../../utils/processActivity';

function MyActivity({ activity, isLast = false }) {
  const string = processActivity(activity, true);
  return (
    <div
      className={classNames('text-sm border-solid pb-2', {
        'border-b-2': !isLast,
      })}
      style={{ borderColor: '#E17D8A' }}
    >
      {string}
    </div>
  );
}

export default MyActivity;
