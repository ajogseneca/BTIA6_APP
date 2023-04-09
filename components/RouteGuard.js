import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    async function updateAtoms() {
      try {
        const favouritesData = await getFavourites();
        setFavourites(favouritesData);

        const historyData = await getHistory();
        setSearchHistory(historyData);
      } catch (error) {
        console.error(error);
       
      }
    }

    if (!PUBLIC_PATHS.includes(router.pathname)) {
      updateAtoms();
    }
  }, []);

  return <>{props.children}</>;
}
