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

  // Render static text into word spans
  useEffect(() => {
    if (!staticTextRef.current) return;
    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    staticTextRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Trigger falling effect when in viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const checkAndStart = () => {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => setEffectStarted(true), 500);
        return true;
      }
      return false;
    };

    if (checkAndStart()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setEffectStarted(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Physics simulation
  useEffect(() => {
    if (!effectStarted || !staticTextRef.current || !canvasContainerRef.current || !containerRef.current) return;

    staticTextRef.current.style.visibility = "hidden";

    const simulationContainer = document.createElement("div");
    simulationContainer.innerHTML = staticTextRef.current.innerHTML;
    canvasContainerRef.current.appendChild(simulationContainer);

    const wordSpans = simulationContainer.querySelectorAll(".word");
    const containerRect = containerRef.current.getBoundingClientRect();

    const { Engine, Render, World, Bodies, Runner } = Matter;
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

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

    // Boundaries: Floor at the bottom of the container
    const boundaryOptions = { isStatic: true, render: { fillStyle: "transparent" } };
    const floorHeight = 50; // Thickness of the floor
    const floor = Bodies.rectangle(width / 2, height - floorHeight / 2, width, floorHeight, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Create word bodies
    const wordBodies = Array.from(wordSpans).map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

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
    <div ref={containerRef} className="falling-text-container" style={{ height: "100%" }}>
      <div
        ref={staticTextRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div
        ref={canvasContainerRef}
        className="falling-text-canvas"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default FallingText;