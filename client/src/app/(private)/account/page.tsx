import AvatarForm from './avatar-form';
import LogoutButton from './logout-button';

export default function Account (): JSX.Element {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-6'>
      <AvatarForm />
      <LogoutButton />
    </div>
  );
}
