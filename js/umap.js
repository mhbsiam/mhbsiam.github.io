/*
 * Hero figure: a simulated UMAP embedding that floats.
 *
 * Roughly three thousand generated points in eight gaussian islands drift on a
 * slow bob, answer the pointer with a small parallax, and one island, the
 * age-associated T cells, is held in the accent colour and annotated by the
 * label beside it. Raw WebGL: one program, one draw call, no dependency.
 *
 * Simulated data, clearly captioned as such on the page. Without WebGL (or on
 * context loss) the figure falls back to a static CSS composition; with
 * prefers-reduced-motion it renders a single frame and stops.
 */
(function () {
  'use strict';

  var HOST = document.querySelector('[data-umap]');
  if (!HOST) return;

  var canvas = HOST.querySelector('[data-umap-canvas]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function gaussian(rand) {
    var u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function makeRandom(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Islands: centre, spread, count, colour, alpha, point size, drift amplitude.
     Chartreuse is reserved for the annotated age-associated cluster; the rest
     are chalk and slate greys at varying depth, like ink on a dark plate. */
  var CLUSTERS = [
    { c: [0.64, 0.38], s: [0.035, 0.048], n: 460, rgb: [220, 242, 106], a: 0.95, size: 3.6, amp: 0.004 }, // age-associated
    { c: [0.24, 0.30], s: [0.075, 0.062], n: 520, rgb: [150, 158, 178], a: 0.72, size: 2.8, amp: 0.007 }, // slate
    { c: [0.38, 0.72], s: [0.082, 0.070], n: 600, rgb: [186, 182, 172], a: 0.66, size: 2.8, amp: 0.008 }, // chalk
    { c: [0.74, 0.76], s: [0.058, 0.052], n: 420, rgb: [128, 140, 150], a: 0.70, size: 2.8, amp: 0.007 }, // steel
    { c: [0.14, 0.60], s: [0.048, 0.055], n: 320, rgb: [168, 166, 152], a: 0.62, size: 2.7, amp: 0.006 }, // ash
    { c: [0.50, 0.14], s: [0.052, 0.040], n: 300, rgb: [112, 118, 138], a: 0.68, size: 2.6, amp: 0.006 }, // indigo grey
    { c: [0.88, 0.24], s: [0.040, 0.048], n: 260, rgb: [140, 150, 160], a: 0.62, size: 2.6, amp: 0.005 }, // fog
    { c: [0.30, 0.48], s: [0.030, 0.034], n: 220, rgb: [100, 104, 118], a: 0.70, size: 2.4, amp: 0.005 }  // graphite
  ];
  var OUTLIERS = 90;
  var OUTLIER_RGB = [130, 134, 148];

  function buildCloud() {
    var rand = makeRandom(20260906);
    var total = CLUSTERS.reduce(function (sum, c) { return sum + c.n; }, 0) + OUTLIERS;
    var pos = new Float32Array(total * 2);
    var col = new Float32Array(total * 4);
    var size = new Float32Array(total);
    var phase = new Float32Array(total);
    var amp = new Float32Array(total);

    var i = 0;
    CLUSTERS.forEach(function (c) {
      for (var k = 0; k < c.n; k += 1) {
        pos[i * 2] = Math.min(0.995, Math.max(0.005, c.c[0] + gaussian(rand) * c.s[0]));
        pos[i * 2 + 1] = Math.min(0.995, Math.max(0.005, c.c[1] + gaussian(rand) * c.s[1]));
        col[i * 4] = c.rgb[0] / 255; col[i * 4 + 1] = c.rgb[1] / 255;
        col[i * 4 + 2] = c.rgb[2] / 255; col[i * 4 + 3] = c.a;
        size[i] = c.size * (0.8 + rand() * 0.5);
        phase[i] = rand() * Math.PI * 2;
        amp[i] = c.amp * (0.6 + rand() * 0.8);
        i += 1;
      }
    });
    for (var o = 0; o < OUTLIERS; o += 1) {
      pos[i * 2] = 0.02 + rand() * 0.96;
      pos[i * 2 + 1] = 0.02 + rand() * 0.96;
      col[i * 4] = OUTLIER_RGB[0] / 255; col[i * 4 + 1] = OUTLIER_RGB[1] / 255;
      col[i * 4 + 2] = OUTLIER_RGB[2] / 255; col[i * 4 + 3] = 0.4;
      size[i] = 2.1; phase[i] = rand() * Math.PI * 2; amp[i] = 0.009;
      i += 1;
    }
    return { pos: pos, col: col, size: size, phase: phase, amp: amp, total: total };
  }

  var VERTEX = [
    'attribute vec2 a_pos;',
    'attribute vec4 a_color;',
    'attribute float a_size;',
    'attribute float a_phase;',
    'attribute float a_amp;',
    'uniform vec2 u_res;',
    'uniform float u_time;',
    'uniform vec2 u_offset;',
    'uniform float u_dpr;',
    'uniform float u_scale;',
    'uniform float u_alpha;',
    'varying vec4 v_color;',
    'void main() {',
    '  vec2 p = a_pos + u_offset;',
    '  p += vec2(sin(u_time * 0.7 + a_phase), cos(u_time * 0.9 + a_phase * 1.7)) * a_amp;',
    '  vec2 pix = p * u_res;',
    '  gl_Position = vec4(pix.x / u_res.x * 2.0 - 1.0, 1.0 - pix.y / u_res.y * 2.0, 0.0, 1.0);',
    '  gl_PointSize = a_size * u_dpr * u_scale;',
    '  v_color = vec4(a_color.rgb, a_color.a * u_alpha);',
    '}'
  ].join('\n');

  var FRAGMENT = [
    'precision mediump float;',
    'varying vec4 v_color;',
    'void main() {',
    '  vec2 d = gl_PointCoord - vec2(0.5);',
    '  float a = (1.0 - smoothstep(0.28, 0.5, length(d))) * v_color.a;',
    '  gl_FragColor = vec4(v_color.rgb, a);',
    '}'
  ].join('\n');

  function goStatic() { HOST.setAttribute('data-static', 'true'); }

  var gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!gl) { goStatic(); return; }

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
    return shader;
  }

  var vs = compile(gl.VERTEX_SHADER, VERTEX);
  var fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  var program = gl.createProgram();
  if (!vs || !fs) { goStatic(); return; }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { goStatic(); return; }
  gl.useProgram(program);

  canvas.addEventListener('webglcontextlost', function (e) {
    e.preventDefault();
    goStatic();
  });

  var cloud = buildCloud();
  [['a_pos', cloud.pos, 2], ['a_color', cloud.col, 4], ['a_size', cloud.size, 1],
   ['a_phase', cloud.phase, 1], ['a_amp', cloud.amp, 1]].forEach(function (attr) {
    var location = gl.getAttribLocation(program, attr[0]);
    if (location === -1) return;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, attr[1], gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, attr[2], gl.FLOAT, false, 0, 0);
  });

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  var uniforms = {
    res: gl.getUniformLocation(program, 'u_res'),
    time: gl.getUniformLocation(program, 'u_time'),
    offset: gl.getUniformLocation(program, 'u_offset'),
    dpr: gl.getUniformLocation(program, 'u_dpr'),
    scale: gl.getUniformLocation(program, 'u_scale'),
    alpha: gl.getUniformLocation(program, 'u_alpha')
  };

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var scaleVal = 1;
  var fadeStart = 0;

  function resize() {
    /* Measure the canvas itself, not the host: on narrow viewports the
       annotation card sits below the plot inside the same host. */
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) rect = HOST.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var w = Math.max(1, Math.round(rect.width * dpr));
    var h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    /* Keep the cloud's density as the figure scales: points grow with the canvas. */
    scaleVal = Math.max(0.9, Math.min(1.45, canvas.width / 830));
  }

  function draw(time, offset) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uniforms.res, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, time);
    gl.uniform2f(uniforms.offset, offset[0], offset[1]);
    gl.uniform1f(uniforms.dpr, dpr);
    gl.uniform1f(uniforms.scale, scaleVal);
    gl.uniform1f(uniforms.alpha, Math.min(1, (time - fadeStart) / 1.4));
    gl.drawArrays(gl.POINTS, 0, cloud.total);
  }

  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(HOST);
  else window.addEventListener('resize', resize);

  var targetX = 0, targetY = 0, driftX = 0, driftY = 0;

  if (!reduceMotion.matches && window.matchMedia('(hover: hover)').matches) {
    HOST.addEventListener('pointermove', function (event) {
      var rect = HOST.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.024;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.024;
    });
    HOST.addEventListener('pointerleave', function () { targetX = 0; targetY = 0; });
  }

  var start = null;

  function frame(now) {
    if (start === null) start = now;
    var t = (now - start) / 1000;
    driftX += (targetX - driftX) * 0.05;
    driftY += (targetY - driftY) * 0.05;
    var ox = Math.sin(t * 0.21) * 0.006 + driftX;
    var oy = Math.cos(t * 0.27) * 0.008 + driftY;
    draw(t, [ox, oy]);
  }

  if (reduceMotion.matches) {
    draw(1.5, [0, 0]);
    return;
  }

  fadeStart = 0;
  var onScreen = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
    }, { rootMargin: '120px' }).observe(HOST);
  }

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && onScreen) draw((performance.now() - start) / 1000 || 1.5,
      [Math.sin(performance.now() / 1000 * 0.21) * 0.006, Math.cos(performance.now() / 1000 * 0.27) * 0.008]);
  });

  (function loop(now) {
    if (onScreen && !document.hidden) frame(now || 0);
    window.requestAnimationFrame(loop);
  })(0);
})();
