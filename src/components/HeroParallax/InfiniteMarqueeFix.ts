/**
 * TRUE CIRCULAR INFINITE MARQUEE
 * Images that exit left IMMEDIATELY reappear from the right
 * This is the final, working solution that ensures proper wrap-around
 */

export function initInfiniteMarquees() {
  // Cleanup function to remove any previous styles
  function cleanupPreviousStyles() {
    const previousStyles = document.querySelectorAll('.marquee-style');
    previousStyles.forEach(style => style.remove());
  }

  // Wait for DOM to be fully loaded and styles calculated
  function setupMarquees() {
    cleanupPreviousStyles();
    
    const tracks = document.querySelectorAll<HTMLElement>('.hero-parallax-track');
    if (!tracks.length) {
      console.warn('No tracks found for infinite marquee');
      return;
    }
    
    // Process each track separately
    tracks.forEach((track, trackIdx) => {
      try {
        setupSingleTrack(track, trackIdx);
      } catch (err) {
        console.error('Error setting up track:', err);
      }
    });
  }
  
  function setupSingleTrack(track: HTMLElement, trackIdx: number) {
    // First, find the group with the original posters
    const originalGroup = track.querySelector<HTMLElement>('.hero-parallax-group');
    if (!originalGroup) return;
    
    // Direction - alternate rows move in opposite directions
    const moveRight = track.classList.contains('scroll-right');
    
    // Extract all posters from the original group
    const posters = Array.from(originalGroup.querySelectorAll<HTMLElement>('.hero-parallax-poster'));
    if (!posters.length) return;
    
    // CRITICAL: Get exact measurements of each poster and gap
    const groupStyle = window.getComputedStyle(originalGroup);
    const gapSize = parseFloat(groupStyle.gap || '0');
    
    // Calculate exact width of a single content block (all posters + gaps)
    const contentWidth = posters.reduce((sum, poster) => {
      return sum + poster.offsetWidth;
    }, 0) + ((posters.length - 1) * gapSize);
    
    // Clear track and setup for true circular animation
    track.innerHTML = '';
    track.style.width = '100%';
    track.style.overflow = 'hidden';
    
    // Create outer wrapper that controls animation
    const wrapper = document.createElement('div');
    wrapper.className = 'marquee-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.width = 'fit-content';
    
    // Calculate number of copies needed for a smooth infinite scroll
    // We need AT LEAST enough copies to fill screen width + 1 full copy (to ensure wrap)
    const viewWidth = window.innerWidth;
    const minCopies = Math.ceil(viewWidth / contentWidth) + 2;
    const copies = Math.max(minCopies, 5); // Always use at least 5 copies for safety
    
    // Create copies to ensure smooth circular flow
    for (let i = 0; i < copies; i++) {
      const groupClone = document.createElement('div');
      groupClone.className = 'hero-parallax-group';
      groupClone.style.display = 'flex';
      groupClone.style.gap = `${gapSize}px`;
      groupClone.style.padding = '0';
      groupClone.style.alignItems = 'center';
      
      // Clone each poster into the group
      posters.forEach(poster => {
        const clone = poster.cloneNode(true) as HTMLElement;
        groupClone.appendChild(clone);
      });
      
      wrapper.appendChild(groupClone);
    }
    
    track.appendChild(wrapper);
    
    // CRITICAL: Create TRUE circular animation
    // We animate EXACTLY one group width, then snap back
    const animationName = `marquee-${trackIdx}`;
    const baseDurationSeconds = moveRight ? 35 : 28;
    const isPhone = window.matchMedia('(max-width: 768px)').matches;
    const durationSeconds = isPhone ? baseDurationSeconds * 10 : baseDurationSeconds;
    const duration = `${durationSeconds}s`;
    
    const style = document.createElement('style');
    style.className = 'marquee-style';
    style.textContent = `
      /* Animation for track ${trackIdx} */
      @keyframes ${animationName} {
        0% { transform: translateX(0); }
        100% { transform: translateX(${moveRight ? '' : '-'}${contentWidth}px); }
      }
      
      .hero-parallax-track:nth-child(${trackIdx + 1}) .marquee-wrapper {
        animation: ${animationName} ${duration} linear infinite;
        animation-play-state: running;
        will-change: transform;
      }

      @media (hover: hover) and (pointer: fine) {
        .hero-parallax-track:nth-child(${trackIdx + 1}):hover .marquee-wrapper {
          animation-play-state: paused;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // Execute once DOM is loaded
  if (document.readyState === 'complete') {
    setTimeout(setupMarquees, 100);
  } else {
    window.addEventListener('load', () => setTimeout(setupMarquees, 100));
  }
  
  // Re-run on window resize to adjust copy count if needed
  window.addEventListener('resize', () => {
    setTimeout(setupMarquees, 100);
  });
}

export default initInfiniteMarquees;
