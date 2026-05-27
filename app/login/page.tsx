import LoginForm from './LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход | Учи Английски',
  description: 'Влез в профила си и продължи да учиш английски.',
};

type Props = { searchParams: Promise<{ next?: string; error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const next   = (params.next?.startsWith('/') && !params.next?.startsWith('//'))
    ? params.next
    : '/napredak';

  return <LoginForm next={next} callbackError={params.error} />;
}
