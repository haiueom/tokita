import { cookies } from 'next/headers';
import DismissButton from '@/components/buttons/dismiss';

export default function Toast() {
    const cookieStore = cookies();
    const isHidden = cookieStore.get('template-banner-hidden');

    return isHidden ? null : (
        <div className="sticky bottom-10 left-0 right-0 z-10 mx-auto h-40 w-11/12 rounded-2xl p-0.5 sm:h-[80px] sm:w-[581px]">
            <div className="flex h-full w-full flex-col items-center justify-center space-y-3 rounded-[14px] border border-gray-200 bg-gray-50 px-5 sm:flex-row sm:justify-between sm:space-y-0">
                <p className="flex h-10 w-[304px] items-center justify-center p-3 font-mono text-[13px] text-black">
                    Get started with Next.js and Vercel instantly. <DismissButton />
                </p>
                <a
                    className="flex h-10 w-[220px] items-center justify-center whitespace-nowrap rounded-md bg-black font-mono text-[13px] text-white transition-all hover:bg-gray-700"
                    href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs"
                    target="_blank"
                    rel="noreferrer"
                >
                    Clone & Deploy
                </a>
            </div>
        </div>
    );
}
