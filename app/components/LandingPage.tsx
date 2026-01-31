
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 animate-fade-in animate-slide-in-top">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to Your Daily Dock
        </h1>
        <p className="text-xl mb-8">
          Organize your life with Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, ab officiis. Sint tempore placeat ex rerum, enim architecto cupiditate maxime!
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-secondary text-secondary-foreground dark:text-muted-foreground hover:bg-secondary/90 px-8 py-6 text-lg">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground dark:text-muted-foreground hover:bg-primary/90 px-8 py-6 text-lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
