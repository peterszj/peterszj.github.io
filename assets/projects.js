/* ========================================
   Peter Sun — Portfolio Site
   Single source of truth for project detail content.
   Consumed by drawer.js and rendered into the slide-out drawer.
   Each project: { id, eyebrow, title, meta:[[term,def],...], body }
   ======================================== */

window.PROJECTS = {

  /* ---------------------------------------------------------------- */
  kronos: {
    id: "kronos",
    eyebrow: "Research project · [start date] – Present",
    title: "Fine-Tuning KRONOS — a Spatial-Proteomics Foundation Model",
    meta: [
      ["Advisor", "Prof. Jie Liu, University of Michigan [confirm / add lab + senior PhD mentor]"],
      ["Role", "Undergraduate research assistant — [your specific role]"],
      ["Stack", "Python, PyTorch, [base model checkpoint], [datasets], [hardware]"],
      ["Status", "Ongoing — happy to discuss in detail with prospective advisors"]
    ],
    body: `
      <div class="callout">
        <strong>Draft — needs your input.</strong> The text below is a
        placeholder skeleton written from the one-line brief
        (self-supervised fine-tuning of a spatial-proteomics foundation
        model) plus the existing site copy about the Michigan work under
        Prof. Jie Liu. Please replace anything in <span class="mono">[brackets]</span>
        and correct any detail I have guessed at.
      </div>

      <h2>The problem</h2>
      <p>
        Spatial proteomics measures many proteins at once while preserving
        where each measurement sits in the tissue — so the data is
        image-like, high-dimensional, and expensive to label. <strong>KRONOS</strong>
        is a foundation model for this setting: pretrained on large amounts
        of unlabeled spatial-proteomics imagery so that it learns general
        representations of cells and tissue structure. [One or two sentences,
        in your own words, on what KRONOS is and why a foundation model is
        the right tool here.]
      </p>

      <h2>What I am doing</h2>
      <p>
        I am <strong>fine-tuning KRONOS</strong> for [your downstream task —
        e.g. cell-type classification / niche detection / a specific tissue
        or disease]. [Describe the self-supervised objective or adaptation
        strategy you are using, the dataset(s), and how you are evaluating it.]
      </p>
      <p>
        [Concrete contributions so far: what you built, what you measured,
        any preliminary result you can share. Keep one detail the reader can
        anchor on — a metric, a dataset size, a design choice.]
      </p>

      <div class="callout">
        [The one modeling or engineering decision you are most proud of, and
        why — mirror the voice of the other project write-ups.]
      </div>

      <h2>Why this matters for my Ph.D. interests</h2>
      <p>
        This work sits exactly at the intersection I want to keep working in:
        <em>self-supervised representation learning</em> applied to
        <em>scientific and biomedical computer vision</em>, where labels are
        scarce and the images come from instruments rather than the web.
        [One or two sentences connecting KRONOS to the research direction you
        want to pursue in a Ph.D.]
      </p>
    `
  },

  /* ---------------------------------------------------------------- */
  cuda: {
    id: "cuda",
    eyebrow: "Coursework project · Winter 2026",
    title: "Optimizing a CUDA Convolution Kernel for a LeNet-style CNN",
    meta: [
      ["Course", "EECS 471: Applied Parallel Programming with GPUs"],
      ["Role", "Team project"],
      ["Stack", "C++, CUDA, Nsight Compute, Fashion-MNIST"],
      ["Output", "Optimized kernel + profiling report"]
    ],
    body: `
      <h2>The task</h2>
      <p>
        Implement the forward-convolution step of a LeNet-style CNN as a CUDA
        kernel, then progressively optimize it. The goal was not just speed,
        but <em>quantitatively justified</em> speed: every optimization had to
        be motivated by what Nsight Compute showed about the previous version
        — occupancy, memory throughput, stall reasons — rather than guessed at.
      </p>

      <h2>Four optimizations, stacked</h2>
      <p>
        I implemented the optimizations in the order below. Each builds on the
        previous one, and each was profiled in isolation to make sure it was
        actually responsible for the improvement.
      </p>

      <div class="figure">
        <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four-step optimization stack: constant memory, tiled shared memory, weight transposition, register accumulation.">
          <defs>
            <style>
              .step { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
              .step-accent { fill: #f3e9e9; stroke: #7a1f1f; stroke-width: 1.4; }
              .step-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: #7a1f1f; font-weight: 600; letter-spacing: 0.1em; }
              .step-title { font-family: 'Crimson Pro', serif; font-size: 14px; fill: #1a1a1a; font-weight: 600; }
              .step-why { font-family: 'Crimson Pro', serif; font-size: 12px; fill: #4a4a4a; font-style: italic; }
              .arrow-down { stroke: #7a1f1f; stroke-width: 1.5; fill: none; marker-end: url(#arr2); }
            </style>
            <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#7a1f1f"/>
            </marker>
          </defs>
          <rect x="40" y="20" width="600" height="42" class="step"/>
          <text x="58" y="38" class="step-num">01</text>
          <text x="92" y="38" class="step-title">Constant memory for weights</text>
          <text x="92" y="55" class="step-why">— weights are read by every thread, never written; broadcast-friendly</text>
          <line x1="340" y1="62" x2="340" y2="72" class="arrow-down"/>
          <rect x="40" y="74" width="600" height="42" class="step"/>
          <text x="58" y="92" class="step-num">02</text>
          <text x="92" y="92" class="step-title">Tiled shared memory for input feature maps</text>
          <text x="92" y="109" class="step-why">— amortize global-memory reads across a block of cooperating threads</text>
          <line x1="340" y1="116" x2="340" y2="126" class="arrow-down"/>
          <rect x="40" y="128" width="600" height="42" class="step"/>
          <text x="58" y="146" class="step-num">03</text>
          <text x="92" y="146" class="step-title">Weight transposition for coalesced access</text>
          <text x="92" y="163" class="step-why">— rearrange layout so consecutive threads read consecutive bytes</text>
          <line x1="340" y1="170" x2="340" y2="180" class="arrow-down"/>
          <rect x="40" y="182" width="600" height="42" class="step-accent"/>
          <text x="58" y="200" class="step-num">04</text>
          <text x="92" y="200" class="step-title">Register-level accumulation</text>
          <text x="92" y="217" class="step-why">— keep partial sums in registers; cut shared-memory traffic in the inner loop</text>
        </svg>
        <p class="figure-caption">The optimization stack. Each step targets a specific bottleneck identified in the previous Nsight Compute profile.</p>
      </div>

      <h3>01 — Constant memory for the weight tensor</h3>
      <p>
        The convolution weights are small, read by every thread, and never
        written during inference — the textbook case for CUDA's constant
        memory. Moving them out of global memory removed a layer of cache
        pressure and reduced average load latency. The profile after this
        change showed that the bottleneck had shifted from weight reads to
        input feature-map reads, which set up the next step.
      </p>

      <h3>02 — Tiled shared memory for input feature maps</h3>
      <p>
        Adjacent output pixels share a large fraction of their input window,
        so without tiling we re-read the same input bytes from global memory
        over and over. I had each thread block cooperatively load a tile of
        the input into shared memory once, then compute all the output pixels
        that depend on that tile. This produced the largest single speedup of
        the four steps.
      </p>

      <h3>03 — Weight transposition for coalesced access</h3>
      <p>
        Even with shared-memory tiling, the access pattern for weights was
        misaligned: consecutive threads were reading non-consecutive memory
        addresses, which the GPU's memory subsystem cannot coalesce into a
        single transaction. Transposing the weight layout so that consecutive
        threads read consecutive bytes turned several smaller memory
        transactions into one larger one, and the profiler reported a clear
        jump in achieved memory bandwidth.
      </p>

      <h3>04 — Register-level accumulation in the inner loop</h3>
      <p>
        By this point shared memory had become the dominant traffic. The fix
        was to give each thread a small bank of registers for accumulating
        partial sums, rather than writing intermediate results back to shared
        memory between every multiply-add. This squeezed out the last
        significant chunk of latency in the inner loop. After this step,
        Nsight Compute reported the kernel was approaching the memory-
        bandwidth ceiling — the right place for a memory-bound kernel to end.
      </p>

      <h2>The profiling habit</h2>
      <p>
        The most useful part of the project was not any individual
        optimization — it was the discipline of <em>letting the profiler
        decide what to optimize next</em>. The temptation, when you know a
        short list of CUDA tricks, is to apply them in whatever order feels
        intuitive. Parsing the <span class="mono">.ncu-rep</span> files
        forced me to stop guessing: at every step, I had to identify the
        current limiter (memory throughput? warp stalls? occupancy?) and
        choose the optimization that addressed <em>that specific</em>
        bottleneck.
      </p>

      <div class="callout">
        The lesson generalizes well beyond CUDA. Whether the system is a GPU
        kernel, a deep-learning training loop, or a data pipeline, the same
        rule applies: <strong>do not optimize what feels slow; optimize what
        the profiler proves is slow.</strong>
      </div>

      <h2>Why this matters for my Ph.D. interests</h2>
      <p>
        A lot of contemporary ML research lives in a layer of abstraction that
        hides the hardware. That is mostly a good thing — but the people who
        can move fluently between the model and the silicon underneath it tend
        to ask better questions about <em>what is actually achievable</em>.
        My research interests are in computer vision and representation
        learning, but I want to keep the systems instinct sharp, because
        foundation-model work in particular is increasingly a systems problem
        in disguise.
      </p>
    `
  },

  /* ---------------------------------------------------------------- */
  temp: {
    id: "temp",
    eyebrow: "Research project · March – August 2025",
    title: "Voxel-Based 3D Temperature Field Reconstruction with a Spatiotemporal CNN",
    meta: [
      ["Advisor", "Prof. Xiaodong Gu, Shanghai Jiao Tong University"],
      ["Role", "Research assistant — pipeline design and model development"],
      ["Stack", "Python, PyTorch, Open3D, NumPy, 3D CNNs"],
      ["Duration", "Six months"]
    ],
    body: `
      <h2>The problem</h2>
      <p>
        High-temperature components — turbine blades, combustion chambers,
        heat-shield assemblies — are notoriously hard to instrument. Engineers
        can place thermal sensors at a handful of accessible points, but the
        full three-dimensional, time-evolving temperature field inside the
        component remains hidden. Traditional finite-element simulations can
        produce that field, but they are expensive enough that running one for
        every operating condition is impractical.
      </p>
      <p>
        The hypothesis behind this project: <em>if we can train a neural
        network to predict the full temperature field from the geometry of the
        component plus a sparse set of sensor readings, we can replace
        expensive simulations with cheap inference</em> — at least for
        components similar to those in the training set.
      </p>

      <h2>What I built</h2>

      <h3>An Open3D-based voxelization pipeline</h3>
      <p>
        The hardest part of this project was not the model — it was the data.
        The team had STL meshes of components and thermal sensor data in
        several incompatible formats, and the existing preprocessing workflow
        was a brittle sequence of manual normalization steps that introduced
        silent errors. I rewrote it as a single
        <span class="mono">Open3D</span>-centred pipeline that:
      </p>
      <ul style="margin-left: var(--space-4); margin-bottom: var(--space-3); color: var(--ink-soft);">
        <li style="text-align: left;">ingests an arbitrary STL mesh and produces a fixed-resolution
          voxel grid as the geometric input;</li>
        <li style="text-align: left;">aligns sparse thermal readings to that voxel grid, producing
          partially-observed temperature tensors as targets;</li>
        <li style="text-align: left;">normalizes both consistently, so that the same mesh always
          produces the same input tensor regardless of who ran the script.</li>
      </ul>
      <p>
        The change eliminated a recurring class of manual-entry errors and
        roughly doubled how fast the team could iterate on architecture
        changes — because the bottleneck moved from "debug the data" to
        "debug the model."
      </p>

      <div class="figure">
        <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipeline schematic: STL mesh and thermal sensor data flow into an Open3D-based voxelization step, then into a 3D CNN that produces a predicted temperature field.">
          <defs>
            <style>
              .node { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
              .accent-node { fill: #f3e9e9; stroke: #7a1f1f; stroke-width: 1.4; }
              .node-label { font-family: 'Crimson Pro', serif; font-size: 13px; fill: #1a1a1a; }
              .accent-label { fill: #7a1f1f; font-weight: 600; }
              .sub-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; fill: #8a8a8a; text-transform: uppercase; letter-spacing: 0.08em; }
              .arrow { stroke: #4a4a4a; stroke-width: 1.2; fill: none; marker-end: url(#arrowhead); }
            </style>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#4a4a4a"/>
            </marker>
          </defs>
          <rect x="20" y="40" width="120" height="42" class="node"/>
          <text x="80" y="58" class="node-label" text-anchor="middle">STL mesh</text>
          <text x="80" y="74" class="sub-label" text-anchor="middle">geometry</text>
          <rect x="20" y="115" width="120" height="42" class="node"/>
          <text x="80" y="133" class="node-label" text-anchor="middle">Sensor readings</text>
          <text x="80" y="149" class="sub-label" text-anchor="middle">sparse, partial</text>
          <rect x="220" y="78" width="160" height="42" class="accent-node"/>
          <text x="300" y="96" class="node-label accent-label" text-anchor="middle">Open3D voxelization</text>
          <text x="300" y="111" class="sub-label" text-anchor="middle">mesh → voxel grid</text>
          <rect x="450" y="78" width="120" height="42" class="node"/>
          <text x="510" y="96" class="node-label" text-anchor="middle">3D CNN</text>
          <text x="510" y="111" class="sub-label" text-anchor="middle">spatiotemporal</text>
          <rect x="610" y="78" width="60" height="42" class="node"/>
          <text x="640" y="96" class="node-label" text-anchor="middle">T̂(x,t)</text>
          <text x="640" y="111" class="sub-label" text-anchor="middle">field</text>
          <path d="M 140 61 L 220 90" class="arrow"/>
          <path d="M 140 136 L 220 110" class="arrow"/>
          <path d="M 380 99 L 450 99" class="arrow"/>
          <path d="M 570 99 L 610 99" class="arrow"/>
        </svg>
        <p class="figure-caption">End-to-end pipeline: STL geometry and sparse thermal readings are voxelized together, then a 3D CNN predicts the full temperature field over time.</p>
      </div>

      <h3>A 3D convolutional network for spatiotemporal prediction</h3>
      <p>
        On top of the voxelized data I built a <strong>3D CNN</strong> that
        treats time as the fourth dimension: the network sees a short history
        of partial temperature observations on the voxel grid and predicts the
        full field at the next time step. The architecture borrows the
        standard encoder-decoder pattern from medical-imaging segmentation,
        but operates on 3D tensors throughout rather than 2D slices, so that
        spatial correlations between voxels stay intact.
      </p>

      <div class="callout">
        The interesting modeling decision here was treating <em>time as a
        convolutional dimension</em> rather than a recurrent one. For the kinds
        of components we worked on, the temperature evolution is smooth enough
        that a windowed 3D convolution captures the dynamics, and avoids the
        training instability of recurrent networks on long sequences.
      </div>

      <h2>What I learned</h2>
      <p>
        Two things, both about the texture of research rather than the
        technical content.
      </p>
      <p>
        First, that <strong>data infrastructure is the lever</strong>. The team
        spent more effort fighting preprocessing inconsistencies than tuning
        the model, and the moment we centralized the pipeline, the rate of
        productive experiments shot up. I now reflexively start any new
        research project by asking: <em>what is the smallest reliable data
        pipeline I can build before touching the model?</em>
      </p>
      <p>
        Second, that <strong>working in an unfamiliar domain is mostly a
        reading problem</strong>. I came in knowing computer vision but not
        thermomechanics; the project required me to understand enough of the
        underlying physics to know what the model was being asked to do, even
        if I was not going to solve the PDEs by hand. The habit of reading
        domain literature alongside the ML literature has carried over to my
        current work on spatial biology.
      </p>
    `
  },

  /* ---------------------------------------------------------------- */
  memchip: {
    id: "memchip",
    eyebrow: "Course project · Spring 2024",
    title: "Memory Chip — A 2D Game Built from Scratch in Six Weeks",
    meta: [
      ["Course", "Introduction to Engineering · UM-SJTU Joint Institute"],
      ["Role", "Programmer and visual designer"],
      ["Stack", "ELM, Messenger (a custom 2D engine), Gitea, Mattermost"],
      ["Outcome", "Best Game Design award at the course showcase"]
    ],
    body: `
      <h2>The brief</h2>
      <p>
        The course gave each team six weeks to build a 2D breakout-style game,
        with the freedom to add features that would set the project apart.
        The challenge was less about game design in the abstract and more
        about the constraints: we had to use <strong>ELM</strong>, a
        functional language none of us had written before, on top of
        <strong>Messenger</strong>, a 2D engine built by our teaching
        assistants and documented only in an internal manual. None of the
        usual tutorials applied. The interesting question on day one was not
        "what game should we make" but "how do we get any of this working at
        all."
      </p>

      <h2>What I did</h2>

      <h3>Owned the UI and presentation layer</h3>
      <p>
        I took responsibility for the player-facing layer: menu screens,
        scene transitions, in-game HUD, and the visual identity of the game.
        I researched layout patterns and accessibility-friendly type sizing
        from web-design tutorials, then translated those conventions into
        Messenger's component model. Where the engine's primitives were not
        enough, I leaned on AI image-generation tools to produce custom
        visual assets, iterating on prompts until the style felt consistent
        rather than generic.
      </p>

      <h3>Solved the audio-transition problem</h3>
      <p>
        The single hardest engineering moment of the project was getting
        background music to transition cleanly between scenes. The naive
        approach — sending audio messages to the active scene — kept
        failing. After a few false starts I went back to the engine manual
        and read through the API reference more carefully than I had thought
        necessary, and discovered that audio was handled by a top-level
        API called <span class="mono">SOMMsgs</span> that bypassed the
        scene hierarchy entirely. Once we routed audio messages through that
        top-level API, the transitions worked on the first try.
      </p>

      <div class="callout">
        <strong>The lesson, the way I now phrase it to myself:</strong>
        when the engine seems to be refusing to do something obvious,
        nine times out of ten the manual already explains how. The way
        out of a hard problem is to read the manual harder than feels
        reasonable.
      </div>

      <h3>Made the team collaboration legible</h3>
      <p>
        With six weeks to ship, the team's communication overhead would
        have eaten us alive if we hadn't been deliberate about it. We used
        <strong>Gitea</strong> for code review, <strong>Mattermost</strong>
        for asynchronous coordination, and a milestone-and-work-order
        system to keep track of what each member owed by when. I took on a
        quiet coordinating role here — tracking the work orders, flagging
        risks early, and making sure the teaching team's feedback got
        integrated promptly so we didn't accumulate technical debt.
      </p>

      <div class="figure">
        <svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A schematic timeline of the six-week project: weeks one and two for learning the engine, weeks three and four for core gameplay, weeks five and six for polish, audio, and visual assets.">
          <defs>
            <style>
              .axis { stroke: #8a8a8a; stroke-width: 1; }
              .phase { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
              .phase-accent { fill: #f3e9e9; stroke: #7a1f1f; stroke-width: 1.4; }
              .phase-label { font-family: 'Crimson Pro', serif; font-size: 13px; fill: #1a1a1a; font-weight: 600; }
              .phase-sub { font-family: 'Crimson Pro', serif; font-size: 11.5px; fill: #4a4a4a; font-style: italic; }
              .week-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; fill: #8a8a8a; letter-spacing: 0.08em; }
            </style>
          </defs>
          <line x1="40" y1="200" x2="640" y2="200" class="axis"/>
          <g class="week-num" text-anchor="middle">
            <text x="90" y="220">WEEK 1</text>
            <text x="190" y="220">WEEK 2</text>
            <text x="290" y="220">WEEK 3</text>
            <text x="390" y="220">WEEK 4</text>
            <text x="490" y="220">WEEK 5</text>
            <text x="590" y="220">WEEK 6</text>
          </g>
          <rect x="40" y="80" width="200" height="50" class="phase"/>
          <text x="140" y="100" class="phase-label" text-anchor="middle">Learn the engine</text>
          <text x="140" y="118" class="phase-sub" text-anchor="middle">ELM syntax · Messenger manual</text>
          <rect x="240" y="80" width="200" height="50" class="phase"/>
          <text x="340" y="100" class="phase-label" text-anchor="middle">Core gameplay</text>
          <text x="340" y="118" class="phase-sub" text-anchor="middle">scenes, physics, scoring</text>
          <rect x="440" y="80" width="200" height="50" class="phase-accent"/>
          <text x="540" y="100" class="phase-label" text-anchor="middle">Polish &amp; audio</text>
          <text x="540" y="118" class="phase-sub" text-anchor="middle">UI · transitions · assets</text>
          <line x1="40" y1="130" x2="40" y2="200" class="axis" stroke-dasharray="2 3"/>
          <line x1="240" y1="130" x2="240" y2="200" class="axis" stroke-dasharray="2 3"/>
          <line x1="440" y1="130" x2="440" y2="200" class="axis" stroke-dasharray="2 3"/>
          <line x1="640" y1="130" x2="640" y2="200" class="axis" stroke-dasharray="2 3"/>
          <text x="340" y="40" class="phase-label" text-anchor="middle" font-size="14">Six-week project timeline</text>
          <text x="340" y="58" class="phase-sub" text-anchor="middle">from zero ELM experience to a shipped, award-winning game</text>
        </svg>
        <p class="figure-caption">The shape of the project. Most of the visible work happened in the final phase, but the first two weeks of reading manuals were what made the rest possible.</p>
      </div>

      <h2>What it taught me about engineering</h2>
      <p>
        Memory Chip is the smallest and earliest project I am featuring on
        this site, and I have included it precisely because of that — it is
        where I first learned a few habits I now take for granted.
      </p>
      <p>
        I learned that <strong>reading the manual is not a fallback when you
        are stuck; it is the work</strong>. The audio-transition problem
        that consumed a week of my life was solved in a single paragraph of
        the engine documentation we had not bothered to read carefully. Since
        then I have made a point of reading whatever documentation exists
        before I write any non-trivial code against an unfamiliar tool, and
        have lost a lot less time to similar self-inflicted wounds.
      </p>
      <p>
        I learned that <strong>visual and communicative work counts as
        engineering work</strong>. The team that wins the design award is
        not the team with the most clever code; it is the team that thought
        carefully about what the player would see and feel. That perspective
        has stayed with me, and now shapes how I think about technical
        writing, figure design, and the way I present research.
      </p>
      <p>
        And I learned a phrase I keep coming back to —
        <em>"the magic you are looking for is in the thing you are
        avoiding."</em> Most of my engineering anxieties have a corresponding
        document I am avoiding reading, a sub-system I am avoiding looking
        at, or a question I am avoiding asking. The reliable move is to walk
        toward whichever one of those feels worst.
      </p>
    `
  }

};
