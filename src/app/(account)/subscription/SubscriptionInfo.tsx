import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';
const SubscriptionInfo = () => {
  return (
    <div className='flex flex-col gap-5 justify-start'>
      <Typo
        level='h2'
        classes='coach-heading font-secondary font-semibold tracking-[-0.225px]'
      >
        For Coaches
      </Typo>
      <div className='grid grid-cols-3 gap-y-5'>
        {infos.map(({ label }, id) => {
          return (
            <div
              key={id}
              className='flex w-[17rem] border border-gray-800 rounded-xl flex-row gap-3 px-4 justify-center items-center py-2.5'
            >
              <div className='w-6 h-6'>
                <SvgIcon name='coach-run' />
              </div>

              <Typo classes='line-clamp-2 text-white text-sm font-primary font-medium'>
                {label}
              </Typo>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionInfo;

const infos = [
  {
    label: 'Transmission of athletes’ workout data in real time',
  },
  {
    label: 'Real-time audio coaching during athletes’ workouts',
  },
  {
    label: 'Access to coach’s dashboard',
  },
  {
    label: 'Text communication with athletes',
  },
  {
    label: 'Access to training programs and workouts',
  },
  {
    label: 'Access to athletes’ workout data and summary',
  },
];
