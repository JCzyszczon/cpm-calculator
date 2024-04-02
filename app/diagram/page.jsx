"use client";
import { useSearchParams } from 'next/navigation'
import DiagramPanel from '../components/diagramPanel';
import LoadingElement from '../components/loadingElement';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DiagramPage = () => {

  const router = useRouter();

  const searchParams = useSearchParams()
  const data = searchParams.get('data');
  const finalData = JSON.parse(data);

  useEffect(() => {
    if(!data) {
      router.push('/page-not-found');
    }
  }, [data])
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='w-full min-h-screen flex justify-center items-center'>
        { data ? (
          <DiagramPanel diagramData={finalData}/>
        ) : (
          <LoadingElement/>
        )}
      </section>
    </Suspense>
  );
};
  
export default DiagramPage;