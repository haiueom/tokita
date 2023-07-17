import SignOut from '@/components/sign-out';

export default function Home() {
    return (
        <div className="flex h-screen bg-black">
            <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
                <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-video w-full max-w-screen-lg"
                ></iframe>
                <SignOut />
            </div>
        </div>
    );
}
