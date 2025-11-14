import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.8,
  ease = "power3.out",
  from = { opacity: 0, y: 50, rotateX: -90 },
  to = { opacity: 1, y: 0, rotateX: 0 },
  threshold = 0.1,
  tag = "h1",
  trigger = false,
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      // Split text into characters
      const chars = text.split('').map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="split-char space">&nbsp;</span>;
        }
        return (
          <span key={index} className="split-char" style={{ display: 'inline-block' }}>
            {char}
          </span>
        );
      });

      // Update the element with split characters
      el.innerHTML = '';
      chars.forEach(char => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = char.props.children === '\u00A0' ? '&nbsp;' : char.props.children;
        const spanEl = document.createElement('span');
        spanEl.className = 'split-char';
        spanEl.style.display = 'inline-block';
        spanEl.innerHTML = tempDiv.innerHTML;
        el.appendChild(spanEl);
      });

      const splitChars = el.querySelectorAll('.split-char');

      // Set initial state
      gsap.set(splitChars, from);

      // Create animation timeline without ScrollTrigger if trigger prop is passed
      const tl = gsap.timeline({ paused: true });

      tl.to(splitChars, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
      });

      // Store timeline reference for external control
      el._gsapTimeline = tl;

      return () => {
        if (el._gsapTimeline) {
          el._gsapTimeline.kill();
        }
      };
    },
    {
      dependencies: [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), threshold, fontsLoaded],
      scope: ref,
    }
  );

  // Effect to handle external trigger
  useEffect(() => {
    if (!ref.current || !ref.current._gsapTimeline) return;
    
    if (trigger) {
      ref.current._gsapTimeline.play();
    } else {
      ref.current._gsapTimeline.reverse();
    }
  }, [trigger]);

  const style = {
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
    perspective: "1000px",
  };

  const classes = `split-parent ${className}`;

  switch (tag) {
    case "h1":
      return <h1 ref={ref} style={style} className={classes}></h1>;
    case "h2":
      return <h2 ref={ref} style={style} className={classes}></h2>;
    case "h3":
      return <h3 ref={ref} style={style} className={classes}></h3>;
    default:
      return <p ref={ref} style={style} className={classes}></p>;
  }
};

export default SplitText;
