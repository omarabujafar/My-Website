import { useEffect, useRef, memo } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

/**
 * Vertex shader for the Threads component.
 * Passes UV coordinates to the fragment shader and sets vertex positions.
 */
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/**
 * Fragment shader for the Threads component.
 * Creates animated wavy lines using Perlin noise and distance fields.
 * The shader renders multiple flowing lines that respond to time and mouse input.
 */
const fragmentShader = `
precision highp float;

// Uniforms passed from JavaScript.
uniform float iTime;          // Current time in seconds for animation.
uniform vec3 iResolution;     // Canvas resolution (width, height, aspect ratio).
uniform vec3 uColor;          // Base color for the threads (RGB 0-1).
uniform float uAmplitude;     // Wave amplitude multiplier for line distortion.
uniform float uDistance;      // Vertical spacing between lines.
uniform vec2 uMouse;          // Normalized mouse position (0-1, 0-1).

#define PI 3.1415926538

// Configuration constants for line rendering.
const int u_line_count = 40;      // Number of parallel lines to render.
const float u_line_width = 7.0;   // Base width of each line in pixels.
const float u_line_blur = 10.0;   // Blur/feather amount for line edges.

/**
 * 2D Perlin noise function for generating smooth, continuous random values.
 * Used to create organic wave patterns in the thread lines.
 *
 * @param P - 2D position vector to sample noise at.
 * @return Noise value in range approximately [-1, 1].
 */
float Perlin2D(vec2 P) {
    // Get integer and fractional parts of the input position.
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);

    // Create grid cell coordinates for hashing.
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;

    // Generate pseudo-random hash values for gradient directions.
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));

    // Calculate gradient vectors (centered around 0).
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;

    // Compute dot products of gradients and distance vectors.
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950; // Normalize result to [-1, 1].

    // Apply smooth interpolation (quintic Hermite curve) for blending.
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));

    // Bilinear interpolation of the four corner gradient values.
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

/**
 * Converts a pixel count to normalized screen space based on resolution.
 * Used to maintain consistent line widths across different screen sizes.
 *
 * @param count - Number of pixels.
 * @param resolution - Screen resolution (width, height).
 * @return Normalized size value.
 */
float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

/**
 * Calculates the visibility/intensity of a single wavy line at a given position.
 * Creates flowing lines with Perlin noise distortion and mouse interaction.
 *
 * @param st - Normalized screen coordinates (0-1, 0-1).
 * @param width - Line width in normalized units.
 * @param perc - Line index percentage (0-1, where 0 is first line, 1 is last).
 * @param offset - Phase offset for line variation.
 * @param mouse - Normalized mouse position (0-1, 0-1).
 * @param time - Current animation time.
 * @param amplitude - Wave amplitude multiplier.
 * @param distance - Vertical spacing between lines.
 * @return Line intensity value (0-1).
 */
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    // Calculate the horizontal point where line distortion begins.
    float splitOffset = (perc * 0.4);
    float splitPoint = 0.1 + splitOffset;

    // Calculate amplitude modulation based on horizontal position.
    float amplitudeNormal = smoothstep(splitPoint, 0.7, st.x);
    float amplitudeStrength = 0.5;
    float finalAmplitude = amplitudeNormal * amplitudeStrength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    // Scale time for animation speed and apply mouse influence.
    float timeScaled = time / 10.0 + (mouse.x - 0.5) * 1.0;

    // Calculate blur amount that increases with horizontal position.
    float blurAmount = smoothstep(splitPoint, splitPoint + 0.05, st.x) * perc;

    // Generate noise-based horizontal displacement by mixing two Perlin noise samples.
    float horizontalNoise = mix(
        Perlin2D(vec2(timeScaled, st.x + perc) * 2.5),
        Perlin2D(vec2(timeScaled, st.x + timeScaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    // Calculate final vertical position of the line with noise distortion.
    float yPosition = 0.5 + (perc - 0.5) * distance + horizontalNoise / 2.0 * finalAmplitude;

    // Create smooth edges for the top of the line using distance field.
    float lineTopEdge = smoothstep(
        yPosition + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blurAmount),
        yPosition,
        st.y
    );

    // Create smooth edges for the bottom of the line using distance field.
    float lineBottomEdge = smoothstep(
        yPosition,
        yPosition - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blurAmount),
        st.y
    );

    // Combine edges and apply fade-out based on line index for depth effect.
    return clamp(
        (lineTopEdge - lineBottomEdge) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

/**
 * Main image rendering function that combines all thread lines.
 * Iterates through all lines and composites them into the final image.
 *
 * @param fragColor - Output fragment color (RGBA).
 * @param fragCoord - Fragment coordinates in pixels.
 */
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize fragment coordinates to 0-1 range.
    vec2 normalizedUv = fragCoord / iResolution.xy;

    // Initialize line strength to full (1.0 = no lines visible).
    float lineStrength = 1.0;

    // Render each line and multiply their inverse values for compositing.
    for (int lineIndex = 0; lineIndex < u_line_count; lineIndex++) {
        float linePercentage = float(lineIndex) / float(u_line_count);
        lineStrength *= (1.0 - lineFn(
            normalizedUv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - linePercentage),
            linePercentage,
            (PI * 1.0) * linePercentage,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    // Invert line strength to get final color intensity.
    float colorIntensity = 1.0 - lineStrength;

    // Apply color and alpha based on line intensity.
    fragColor = vec4(uColor * colorIntensity, colorIntensity);
}

// Shader entry point that calls the main rendering function.
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * Props interface for the Threads component.
 */
interface ThreadsProps {
  /** RGB color values for the threads (0-1 range). Default is white [1, 1, 1]. */
  color?: [number, number, number];
  /** Wave amplitude multiplier. Higher values create more dramatic waves. Default is 1. */
  amplitude?: number;
  /** Vertical spacing between thread lines. Default is 0. */
  distance?: number;
  /** Whether to enable mouse interaction for dynamic thread movement. Default is false. */
  enableMouseInteraction?: boolean;
}

/**
 * Threads component that renders animated wavy lines using WebGL.
 * Creates a flowing thread effect using OGL (Minimal WebGL Library) and custom shaders.
 * The threads respond to time and optionally to mouse movement for interactive effects.
 */
const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const canvasContainer = canvasContainerRef.current;

    // Initialize WebGL renderer with alpha blending for transparency.
    const webglRenderer = new Renderer({ alpha: true, premultiplyAlpha: false });
    const glContext = webglRenderer.gl;
    glContext.clearColor(0, 0, 0, 0); // Transparent background.
    glContext.enable(glContext.BLEND);
    glContext.blendFunc(glContext.SRC_ALPHA, glContext.ONE_MINUS_SRC_ALPHA);

    // Configure canvas for transparent background and no pointer events.
    const webglCanvas = glContext.canvas as HTMLCanvasElement;
    webglCanvas.style.background = 'transparent';
    webglCanvas.style.backgroundColor = 'transparent';
    webglCanvas.style.pointerEvents = 'none';
    webglCanvas.style.opacity = '1';
    webglCanvas.style.display = 'block';
    canvasContainer.appendChild(webglCanvas);

    // Create full-screen triangle geometry (efficient way to render full-screen effects).
    const triangleGeometry = new Triangle(glContext);

    // Create shader program with uniforms for animation parameters.
    const shaderProgram = new Program(glContext, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 }, // Animation time in seconds.
        iResolution: {
          value: new Color(
            glContext.canvas.width,
            glContext.canvas.height,
            glContext.canvas.width / glContext.canvas.height
          )
        },
        uColor: { value: new Color(...color) }, // Thread color.
        uAmplitude: { value: amplitude }, // Wave amplitude.
        uDistance: { value: distance }, // Line spacing.
        uMouse: { value: new Float32Array([0.5, 0.5]) } // Mouse position (centered by default).
      }
    });

    // Create mesh combining geometry and shader program.
    const renderMesh = new Mesh(glContext, { geometry: triangleGeometry, program: shaderProgram });

    /**
     * Handles window resize events and updates canvas and shader uniforms accordingly.
     * Maintains responsive rendering across different screen sizes.
     */
    function handleResize() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Update renderer size.
      webglRenderer.setSize(windowWidth, windowHeight);

      // Update resolution uniform for shader calculations.
      shaderProgram.uniforms.iResolution.value.r = windowWidth;
      shaderProgram.uniforms.iResolution.value.g = windowHeight;
      shaderProgram.uniforms.iResolution.value.b = windowWidth / windowHeight;

      // Ensure canvas fills container.
      webglCanvas.style.width = '100%';
      webglCanvas.style.height = '100%';
      webglCanvas.style.display = 'block';
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size setup.

    // Mouse position tracking with smooth interpolation.
    let currentMousePosition = [0.5, 0.5];
    let targetMousePosition = [0.5, 0.5];

    /**
     * Handles mouse movement events and updates the target mouse position.
     * Coordinates are normalized to 0-1 range with Y axis inverted for WebGL.
     */
    function handleMouseMove(mouseEvent: MouseEvent) {
      const containerBounds = canvasContainer.getBoundingClientRect();
      const normalizedX = (mouseEvent.clientX - containerBounds.left) / containerBounds.width;
      const normalizedY = 1.0 - (mouseEvent.clientY - containerBounds.top) / containerBounds.height;
      targetMousePosition = [normalizedX, normalizedY];
    }

    /**
     * Resets mouse position to center when mouse leaves the container.
     */
    function handleMouseLeave() {
      targetMousePosition = [0.5, 0.5];
    }

    // Attach mouse event listeners if interaction is enabled.
    if (enableMouseInteraction) {
      canvasContainer.addEventListener('mousemove', handleMouseMove);
      canvasContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    /**
     * Animation update loop that runs every frame.
     * Updates time, mouse position, and renders the scene.
     *
     * @param timestamp - Current timestamp in milliseconds from requestAnimationFrame.
     */
    function updateAnimation(timestamp: number) {
      if (enableMouseInteraction) {
        // Smoothly interpolate current mouse position towards target.
        const mouseSmoothingFactor = 0.05;
        currentMousePosition[0] += mouseSmoothingFactor * (targetMousePosition[0] - currentMousePosition[0]);
        currentMousePosition[1] += mouseSmoothingFactor * (targetMousePosition[1] - currentMousePosition[1]);

        // Update shader uniform with smoothed mouse position.
        shaderProgram.uniforms.uMouse.value[0] = currentMousePosition[0];
        shaderProgram.uniforms.uMouse.value[1] = currentMousePosition[1];
      } else {
        // Keep mouse at center if interaction is disabled.
        shaderProgram.uniforms.uMouse.value[0] = 0.5;
        shaderProgram.uniforms.uMouse.value[1] = 0.5;
      }

      // Update time uniform (convert milliseconds to seconds).
      shaderProgram.uniforms.iTime.value = timestamp * 0.001;

      // Render the scene.
      webglRenderer.render({ scene: renderMesh });

      // Schedule next frame.
      animationFrameId.current = requestAnimationFrame(updateAnimation);
    }

    // Start animation loop.
    animationFrameId.current = requestAnimationFrame(updateAnimation);

    // Cleanup function to prevent memory leaks.
    return () => {
      // Cancel animation frame.
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Remove event listeners.
      window.removeEventListener('resize', handleResize);
      if (enableMouseInteraction) {
        canvasContainer.removeEventListener('mousemove', handleMouseMove);
        canvasContainer.removeEventListener('mouseleave', handleMouseLeave);
      }

      // Clean up WebGL resources.
      if (canvasContainer.contains(glContext.canvas)) {
        canvasContainer.removeChild(glContext.canvas);
      }
      glContext.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div
      ref={canvasContainerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'transparent',
        pointerEvents: 'none',
        // PERFORMANCE: Force GPU acceleration
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
};

/**
 * PERFORMANCE: Memoize Threads component to prevent unnecessary re-renders.
 * Only re-render if color, amplitude, distance, or enableMouseInteraction props change.
 * This is critical as the WebGL animation is expensive to recreate.
 */
export default memo(Threads, (previousProps, nextProps) => {
  return (
    previousProps.color?.[0] === nextProps.color?.[0] &&
    previousProps.color?.[1] === nextProps.color?.[1] &&
    previousProps.color?.[2] === nextProps.color?.[2] &&
    previousProps.amplitude === nextProps.amplitude &&
    previousProps.distance === nextProps.distance &&
    previousProps.enableMouseInteraction === nextProps.enableMouseInteraction
  );
});
