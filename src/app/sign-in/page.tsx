import GoogleSignInButton from '@/components/google-sign-in-button';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to RSS Reader
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your feeds
          </p>
        </div>
        <div className="mt-8">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
