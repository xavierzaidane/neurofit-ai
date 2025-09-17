const TerminalOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
      <div className="relative bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded-md sm:rounded-lg p-2 sm:p-3 overflow-hidden font-mono text-[10px] sm:text-xs">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-1 sm:mb-2 border-b border-border pb-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"></div>
            <p className="text-[10px] sm:text-xs text-primary">SYSTEM ACTIVE</p>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground">ID:78412.93</p>
        </div>

        <p className="text-[11px] sm:text-sm text-foreground mb-1 sm:mb-2 tracking-tight">
          <span className="text-primary">/</span> WORKOUT ANALYSIS COMPLETE
        </p>

        <div className="space-y-1 text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="text-primary mr-1 sm:mr-2">01</div>
            <span>30 min strength training (upper body)</span>
          </div>
          <div className="flex items-center">
            <div className="text-primary mr-1 sm:mr-2">02</div>
            <span>20 min cardio (moderate intensity)</span>
          </div>
          <div className="flex items-center">
            <div className="text-primary mr-1 sm:mr-2">03</div>
            <span>10 min flexibility (recovery)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TerminalOverlay;
