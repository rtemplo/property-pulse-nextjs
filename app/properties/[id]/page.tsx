'use client';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';

const PropertyPage = () => {
  const router = useRouter();
  const name = useSearchParams().get('name');
  const pathname = usePathname();

  const goHome = () => {
    router.replace('/');
  };

  const id = useParams().id;

  return (
    <div>
      <div>Property Page {id}</div>
      <div>&quot;name&quot; param: {name}</div>
      <div>Pathname: {pathname}</div>
      <br />
      <hr />
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};

export default PropertyPage;
