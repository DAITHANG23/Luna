const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    className="mr-2"
  >
    <path
      fill="currentColor"
      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
    />
  </svg>
);

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    console.log("Login with Google");

    window.location.href = "http://localhost:8001/api/v1/auth/google";
  };

  return (
    <div
      className="space-y-4 w-full animate-fade-up"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-4 text-muted-foreground text-sm">
          or continue with
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-11 font-medium border shadow-button hover:shadow-button-hover transition-all duration-300 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        <span>Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
