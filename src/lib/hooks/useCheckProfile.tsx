import { getProfile } from '@lib/api';
import { useProfileStore } from '@lib/stores/ProfileStore';

export default function useCheckProfile () {
  const { setUser } = useProfileStore((state) => state);

  return async function () {
    const user = await getProfile();
    setUser(user);
  };
}