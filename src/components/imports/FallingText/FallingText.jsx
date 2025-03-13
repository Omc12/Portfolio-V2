import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import "./FallingText.css";

const FallingText = ({
  text = "",
  highlightWords = [],
  highlightClass = "highlighted",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  fontSize = "1rem",
}) => {
  const containerRef = useRef(null);
  const staticTextRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Render the static text into word spans. This text preserves layout.
  useEffect(() => {
    if (!staticTextRef.current) return;
    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.startsWith(hw)
        );
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    staticTextRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Trigger the falling effect 500ms after the container enters the viewport.
  useEffect(() => {
    if (!containerRef.current) return;

    const checkAndStart = () => {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => {
          setEffectStarted(true);
        }, 500);
        return true;
      }
      return false;
    };

    if (checkAndStart()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setEffectStarted(true);
          }, 500);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // When the effect starts, clone the static text into an overlay for simulation.
  useEffect(() => {
    if (!effectStarted) return;
    if (
      !staticTextRef.current ||
      !canvasContainerRef.current ||
      !containerRef.current
    )
      return;

    // Hide the static text (but keep its space)
    staticTextRef.current.style.visibility = "hidden";

    // Create a simulation layer by cloning the static text's HTML.
    const simulationContainer = document.createElement("div");
    simulationContainer.innerHTML = staticTextRef.current.innerHTML;
    // Append it to the canvas container (which is absolutely positioned over the static text).
    canvasContainerRef.current.appendChild(simulationContainer);

    // Select all word elements from the simulation layer.
    const wordSpans = simulationContainer.querySelectorAll(".word");
    const containerRect = containerRef.current.getBoundingClientRect();

    const { Engine, Render, World, Bodies, Runner } = Matter;
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    // Create a renderer for debugging (if wireframes is enabled).
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    // Create invisible boundaries.
    const boundaryOptions = { isStatic: true, render: { fillStyle: "transparent" } };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Create a Matter.js body for each word element.
    const wordBodies = Array.from(wordSpans).map((elem) => {
      const rect = elem.getBoundingClientRect();
      // Calculate position relative to the container.
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });
      // Give a small random initial velocity.
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

    // Set each word element to absolute positioning within the simulation layer.
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
      elem.style.zIndex = 2;
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Update loop to sync DOM positions with physics bodies.
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine, 16.666);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    // Cleanup on unmount.
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, backgroundColor, wireframes]);

  return (
    <div ref={containerRef} className="falling-text-container">
      {/* Static text placeholder (preserves layout) */}
      <div
        ref={staticTextRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      {/* Simulation overlay container */}
      <div
        ref={canvasContainerRef}
        className="falling-text-canvas"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default FallingText;
