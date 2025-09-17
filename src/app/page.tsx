import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./components/ui/button";
import TerminalOverlay from "./components/TerminalOverlay";
import UserPrograms from "./components/UserPrograms";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-16 sm:py-20 md:py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* CORNER DECORATION */}
            <div className="absolute -top-10 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 border-l-2 border-t-2" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 relative text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <div>
                  <span className="text-foreground">Transform</span>
                </div>
                <div>
                  <span className="text-primary">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>

              {/* SEPARATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Talk to our AI assistant and get personalized diet plans and workout routines
                designed just for you
              </p>

              {/* STATS */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 py-6 font-mono">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-xl sm:text-2xl text-primary">500+</div>
                  <div className="text-xs uppercase tracking-wider">Active Users</div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-xl sm:text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">Generation</div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-xl sm:text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">Personalized</div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6 justify-center lg:justify-start">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium"
                >
                  <Link href={"/generate-program"} className="flex items-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* CORNER PIECES */}
              <div className="absolute -inset-2 sm:-inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-l-2 border-t-2 border-border" />
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-r-2 border-t-2 border-border" />
                <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-l-2 border-b-2 border-border" />
                <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-r-2 border-b-2 border-border" />
              </div>

              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/hero-ai3.png"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center"
                  />

                  {/* SCAN LINE */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                  {/* DECORATIONS */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
};
export default HomePage;
