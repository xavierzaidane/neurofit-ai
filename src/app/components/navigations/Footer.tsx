'use client';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">NEUROFIT<span className="text-xs font-mono font-normal text-muted-foreground">2.0</span></h2>
            <p className="text-white/40 text-sm max-w-xs">
              Pioneering the future of autonomous digital intelligence.
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Discord</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} NexBot AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}