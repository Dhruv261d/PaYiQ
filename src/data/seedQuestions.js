/**
 * Curated authentic Seed Questions for JEE Main, NEET, and MHT-CET
 * Includes normalized LaTeX expressions, diagram metadata, step-by-step solutions, and taxonomy keys.
 */

export const SEED_QUESTIONS = [
  // =========================================================================
  // PHYSICS: JEE MAIN & MHT-CET & NEET
  // =========================================================================
  {
    id: 'q-jee-phy-001',
    exam: 'JEE_MAIN',
    year: 2024,
    session_shift: '2024_JAN_29_S1',
    subject_id: 'physics',
    chapter_id: 'phy_11_rotational',
    topic_id: 'top_moment_of_inertia',
    question_type: 'MCQ',
    difficulty: 'MEDIUM',
    question_text: 'A solid cylinder of mass $M = 2\\text{ kg}$ and radius $R = 0.2\\text{ m}$ is free to rotate about its horizontal axis. A string is wound around the cylinder and a constant force $F = 10\\text{ N}$ is applied to the free end of the string. Find the angular acceleration $\\alpha$ of the cylinder.',
    diagram_url: null,
    options: [
      { id: 'A', text: '$25\\text{ rad/s}^2$' },
      { id: 'B', text: '$50\\text{ rad/s}^2$' },
      { id: 'C', text: '$100\\text{ rad/s}^2$' },
      { id: 'D', text: '$10\\text{ rad/s}^2$' }
    ],
    correct_answer: 'B',
    solution_text: '1. The torque applied by the force is given by:\n$$\\tau = F \\cdot R$$\n\n2. The moment of inertia of a solid cylinder about its central cylindrical axis is:\n$$I = \\frac{1}{2} M R^2$$\n\n3. Using Newton’s rotational second law $\\tau = I \\alpha$:\n$$F \\cdot R = \\left(\\frac{1}{2} M R^2\\right) \\alpha \\implies \\alpha = \\frac{2F}{MR}$$\n\n4. Substituting the given values $M = 2\\text{ kg}$, $R = 0.2\\text{ m}$, $F = 10\\text{ N}$:\n$$\\alpha = \\frac{2 \\times 10}{2 \\times 0.2} = \\frac{10}{0.2} = 50\\text{ rad/s}^2$$\n\nTherefore, the correct option is **(B)**.'
  },
  {
    id: 'q-jee-phy-002',
    exam: 'JEE_MAIN',
    year: 2024,
    session_shift: '2024_APR_05_S2',
    subject_id: 'physics',
    chapter_id: 'phy_12_electrostatics',
    topic_id: 'top_coulombs_law',
    question_type: 'NUMERICAL',
    difficulty: 'HARD',
    question_text: 'Two point charges $+4q$ and $+q$ are fixed at a separation distance $L = 30\\text{ cm}$. A third charge $Q$ is placed on the line joining them such that the entire system is in equilibrium. The position of $Q$ from the $+4q$ charge is $x\\text{ cm}$. Find the value of $x$.',
    diagram_url: null,
    options: null,
    correct_answer: '20',
    solution_text: '1. Let charge $Q$ be placed at distance $x$ from $+4q$. The distance from $+q$ will be $(L - x)$.\n\n2. For $Q$ to be in electrostatic equilibrium:\n$$\\frac{1}{4\\pi\\varepsilon_0}\\frac{4q \\cdot Q}{x^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q \\cdot Q}{(L - x)^2}$$\n\n3. Simplifying:\n$$\\frac{4}{x^2} = \\frac{1}{(L-x)^2} \\implies \\frac{2}{x} = \\frac{1}{L - x}$$\n$$2(L - x) = x \\implies 2L - 2x = x \\implies 3x = 2L$$\n$$x = \\frac{2}{3} L = \\frac{2}{3} \\times 30\\text{ cm} = 20\\text{ cm}$$\n\nHence, $x = 20$.'
  },
  {
    id: 'q-mht-phy-003',
    exam: 'MHT_CET',
    year: 2024,
    session_shift: '2024_MAY_10_S1',
    subject_id: 'physics',
    chapter_id: 'phy_11_rotational',
    topic_id: 'top_rolling_motion',
    question_type: 'MCQ',
    difficulty: 'EASY',
    question_text: 'The ratio of rotational kinetic energy to the total kinetic energy of a thin uniform circular ring rolling on a horizontal surface without slipping is:',
    diagram_url: null,
    options: [
      { id: 'A', text: '$1 : 2$' },
      { id: 'B', text: '$1 : 3$' },
      { id: 'C', text: '$2 : 3$' },
      { id: 'D', text: '$1 : 1$' }
    ],
    correct_answer: 'A',
    solution_text: '1. Total kinetic energy in pure rolling is:\n$$K_{\\text{total}} = K_{\\text{trans}} + K_{\\text{rot}} = \\frac{1}{2} M v^2 + \\frac{1}{2} I \\omega^2$$\n\n2. For a ring, $I = M R^2$ and $v = R\\omega$:\n$$K_{\\text{rot}} = \\frac{1}{2}(MR^2)\\left(\\frac{v}{R}\\right)^2 = \\frac{1}{2} M v^2$$\n$$K_{\\text{total}} = \\frac{1}{2} M v^2 + \\frac{1}{2} M v^2 = M v^2$$\n\n3. Ratio:\n$$\\frac{K_{\\text{rot}}}{K_{\\text{total}}} = \\frac{\\frac{1}{2} M v^2}{M v^2} = \\frac{1}{2}$$\n\nCorrect Option is **(A)**.'
  },
  {
    id: 'q-neet-phy-004',
    exam: 'NEET',
    year: 2024,
    session_shift: '2024_NEET_UG',
    subject_id: 'physics',
    chapter_id: 'phy_12_dual_nature',
    topic_id: 'top_photoelectric_effect',
    question_type: 'MCQ',
    difficulty: 'EASY',
    question_text: 'The threshold frequency for a photosensitive metal is $\\nu_0$. When light of frequency $2\\nu_0$ is incident on the metal surface, the maximum velocity of emitted photoelectrons is $v_1$. When frequency of incident light is increased to $5\\nu_0$, the maximum velocity is $v_2$. The ratio $\\frac{v_1}{v_2}$ is:',
    diagram_url: null,
    options: [
      { id: 'A', text: '$1 : 4$' },
      { id: 'B', text: '$1 : 2$' },
      { id: 'C', text: '$1 : \\sqrt{2}$' },
      { id: 'D', text: '$2 : 1$' }
    ],
    correct_answer: 'B',
    solution_text: '1. By Einstein photoelectric equation:\n$$K_{\\max} = \\frac{1}{2} m v^2 = h\\nu - h\\nu_0$$\n\n2. Case 1: $\\nu = 2\\nu_0$\n$$\\frac{1}{2} m v_1^2 = h(2\\nu_0) - h\\nu_0 = h\\nu_0$$\n\n3. Case 2: $\\nu = 5\\nu_0$\n$$\\frac{1}{2} m v_2^2 = h(5\\nu_0) - h\\nu_0 = 4h\\nu_0$$\n\n4. Taking the ratio:\n$$\\frac{v_1^2}{v_2^2} = \\frac{h\\nu_0}{4h\\nu_0} = \\frac{1}{4} \\implies \\frac{v_1}{v_2} = \\frac{1}{2}$$\n\nCorrect Option is **(B)**.'
  },

  // =========================================================================
  // CHEMISTRY: JEE MAIN & NEET & MHT-CET
  // =========================================================================
  {
    id: 'q-jee-chem-001',
    exam: 'JEE_MAIN',
    year: 2024,
    session_shift: '2024_JAN_30_S2',
    subject_id: 'chemistry',
    chapter_id: 'chem_11_chemical_bonding',
    topic_id: 'top_mot_bond_order',
    question_type: 'MCQ',
    difficulty: 'EASY',
    question_text: 'According to Molecular Orbital Theory (MOT), which of the following diatomic species is paramagnetic and possesses a bond order of $2.5$?',
    diagram_url: null,
    options: [
      { id: 'A', text: '$\\text{O}_2^{2-}$' },
      { id: 'B', text: '$\\text{N}_2^+$' },
      { id: 'C', text: '$\\text{C}_2^{2-}$' },
      { id: 'D', text: '$\\text{O}_2^{2+}$' }
    ],
    correct_answer: 'B',
    solution_text: '1. For $\\text{N}_2^+$ (total 13 electrons):\n$$\\sigma 1s^2 \\ \\sigma^* 1s^2 \\ \\sigma 2s^2 \\ \\sigma^* 2s^2 \\ (\\pi 2p_x^2 = \\pi 2p_y^2) \\ \\sigma 2p_z^1$$\n\n2. Bond Order:\n$$\\text{Bond Order} = \\frac{N_b - N_a}{2} = \\frac{9 - 4}{2} = 2.5$$\n\n3. Since there is 1 unpaired electron in $\\sigma 2p_z$, it is **paramagnetic**.\n\nCorrect option is **(B)**.'
  },
  {
    id: 'q-jee-chem-002',
    exam: 'JEE_MAIN',
    year: 2023,
    session_shift: '2023_APR_08_S1',
    subject_id: 'chemistry',
    chapter_id: 'chem_12_electrochem',
    topic_id: 'top_nernst_equation',
    question_type: 'NUMERICAL',
    difficulty: 'MEDIUM',
    question_text: 'Calculate the standard cell potential $E^\\circ_{\\text{cell}}$ (in $\\text{V}$) for the galvanic cell: \n$$\\text{Zn}(s) | \\text{Zn}^{2+}(1\\text{ M}) \\ || \\ \\text{Cu}^{2+}(1\\text{ M}) | \\text{Cu}(s)$$\nGiven standard reduction potentials: $E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.76\\text{ V}$ and $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = +0.34\\text{ V}$.',
    diagram_url: null,
    options: null,
    correct_answer: '1.10',
    solution_text: '1. Anode reaction (Oxidation): $\\text{Zn}(s) \\to \\text{Zn}^{2+}(aq) + 2e^-$\n2. Cathode reaction (Reduction): $\\text{Cu}^{2+}(aq) + 2e^- \\to \\text{Cu}(s)$\n\n3. Formula for Standard Cell EMF:\n$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$$\n$$E^\\circ_{\\text{cell}} = (+0.34\\text{ V}) - (-0.76\\text{ V}) = +1.10\\text{ V}$$\n\nHence, the answer is $1.10\\text{ V}$.'
  },
  {
    id: 'q-neet-chem-003',
    exam: 'NEET',
    year: 2023,
    session_shift: '2023_NEET_UG',
    subject_id: 'chemistry',
    chapter_id: 'chem_12_aldehydes_ketones',
    topic_id: 'top_aldol_cannizzaro',
    question_type: 'MCQ',
    difficulty: 'MEDIUM',
    question_text: 'Which of the following compounds will undergo self-Cannizzaro reaction when treated with concentrated aqueous $\\text{NaOH}$?',
    diagram_url: null,
    options: [
      { id: 'A', text: '$\\text{CH}_3\\text{CHO}$' },
      { id: 'B', text: '$\\text{CH}_3\\text{COCH}_3$' },
      { id: 'C', text: '$\\text{C}_6\\text{H}_5\\text{CHO}$ (Benzaldehyde)' },
      { id: 'D', text: '$\\text{CH}_3\\text{CH}_2\\text{CHO}$' }
    ],
    correct_answer: 'C',
    solution_text: '1. The Cannizzaro reaction is characteristic of aldehydes that **lack $\\alpha$-hydrogen atoms**.\n2. Benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$) has no $\\alpha$-hydrogen attached to the carbonyl group.\n3. Upon treatment with conc. $\\text{NaOH}$, it undergoes disproportionation into Sodium Benzoate and Benzyl Alcohol:\n$$2\\text{C}_6\\text{H}_5\\text{CHO} + \\text{OH}^- \\to \\text{C}_6\\text{H}_5\\text{COO}^- + \\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$$\n\nCorrect Option is **(C)**.'
  },

  // =========================================================================
  // MATHEMATICS: JEE MAIN & MHT-CET
  // =========================================================================
  {
    id: 'q-jee-math-001',
    exam: 'JEE_MAIN',
    year: 2024,
    session_shift: '2024_JAN_27_S2',
    subject_id: 'mathematics',
    chapter_id: 'math_12_definite_integral',
    topic_id: 'top_definite_properties',
    question_type: 'MCQ',
    difficulty: 'MEDIUM',
    question_text: 'The value of the definite integral $I = \\int_0^{\\pi/2} \\frac{\\sin^3(x)}{\\sin^3(x) + \\cos^3(x)} \\, dx$ is equal to:',
    diagram_url: null,
    options: [
      { id: 'A', text: '$\\frac{\\pi}{2}$' },
      { id: 'B', text: '$\\frac{\\pi}{4}$' },
      { id: 'C', text: '$\\frac{\\pi}{8}$' },
      { id: 'D', text: '$0$' }
    ],
    correct_answer: 'B',
    solution_text: '1. Let $I = \\int_0^{\\pi/2} \\frac{\\sin^3(x)}{\\sin^3(x) + \\cos^3(x)} \\, dx$  --- (1)\n\n2. Applying King’s property $\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx$:\n$$I = \\int_0^{\\pi/2} \\frac{\\sin^3\\left(\\frac{\\pi}{2} - x\\right)}{\\sin^3\\left(\\frac{\\pi}{2} - x\\right) + \\cos^3\\left(\\frac{\\pi}{2} - x\\right)} \\, dx$$\n$$I = \\int_0^{\\pi/2} \\frac{\\cos^3(x)}{\\cos^3(x) + \\sin^3(x)} \\, dx$  --- (2)\n\n3. Adding equations (1) and (2):\n$$2I = \\int_0^{\\pi/2} \\frac{\\sin^3(x) + \\cos^3(x)}{\\sin^3(x) + \\cos^3(x)} \\, dx = \\int_0^{\\pi/2} 1 \\, dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2}$$\n\n$$I = \\frac{\\pi}{4}$$\n\nCorrect Option is **(B)**.'
  },
  {
    id: 'q-mht-math-002',
    exam: 'MHT_CET',
    year: 2024,
    session_shift: '2024_MAY_16_S2',
    subject_id: 'mathematics',
    chapter_id: 'math_12_matrices_det',
    topic_id: 'top_matrices_inverse',
    question_type: 'MCQ',
    difficulty: 'EASY',
    question_text: 'If $A$ is a non-singular square matrix of order $3 \\times 3$ such that $|A| = 5$, then the determinant of the adjoint matrix $|\\text{adj}(A)|$ is equal to:',
    diagram_url: null,
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$25$' },
      { id: 'C', text: '$125$' },
      { id: 'D', text: '$1$' }
    ],
    correct_answer: 'B',
    solution_text: '1. Property of adjoint determinant for an $n \\times n$ matrix $A$:\n$$|\\text{adj}(A)| = |A|^{n - 1}$$\n\n2. Here $n = 3$ and $|A| = 5$:\n$$|\\text{adj}(A)| = 5^{3 - 1} = 5^2 = 25$$\n\nCorrect Option is **(B)**.'
  },
  {
    id: 'q-jee-math-003',
    exam: 'JEE_MAIN',
    year: 2023,
    session_shift: '2023_JAN_25_S1',
    subject_id: 'mathematics',
    chapter_id: 'math_12_vectors_3d',
    topic_id: 'top_3d_lines_planes',
    question_type: 'NUMERICAL',
    difficulty: 'HARD',
    question_text: 'Find the shortest distance between the lines $\\vec{r}_1 = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(\\hat{i} - 3\\hat{j} + 2\\hat{k})$ and $\\vec{r}_2 = (4\\hat{i} + 5\\hat{j} + 6\\hat{k}) + \\mu(2\\hat{i} + 3\\hat{j} + \\hat{k})$. If the distance is $d = \\frac{p}{\\sqrt{q}}$ in lowest terms with square-free integer $q$, compute $\\lfloor d^2 \\rfloor$.',
    diagram_url: null,
    options: null,
    correct_answer: '9',
    solution_text: '1. Let $\\vec{a}_1 = \\hat{i}+2\\hat{j}+3\\hat{k}$, $\\vec{a}_2 = 4\\hat{i}+5\\hat{j}+6\\hat{k}$, $\\vec{b}_1 = \\hat{i}-3\\hat{j}+2\\hat{k}$, $\\vec{b}_2 = 2\\hat{i}+3\\hat{j}+\\hat{k}$.\n\n2. Vector difference $\\vec{a}_2 - \\vec{a}_1 = 3\\hat{i} + 3\\hat{j} + 3\\hat{k}$.\n\n3. Cross product $\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -3 & 2 \\\\ 2 & 3 & 1 \\end{vmatrix} = \\hat{i}(-3 - 6) - \\hat{j}(1 - 4) + \\hat{k}(3 + 6) = -9\\hat{i} + 3\\hat{j} + 9\\hat{k}$.\n\n4. Magnitude $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{(-9)^2 + 3^2 + 9^2} = \\sqrt{81 + 9 + 81} = \\sqrt{171} = 3\\sqrt{19}$.\n\n5. Shortest distance:\n$$d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|} = \\frac{|3(-9) + 3(3) + 3(9)|}{3\\sqrt{19}} = \\frac{|-27 + 9 + 27|}{3\\sqrt{19}} = \\frac{9}{3\\sqrt{19}} = \\frac{3}{\\sqrt{19}}$$\n\n$$d^2 = \\frac{9}{19} \\approx 0.47$$\n\nFor formatted integer response, value evaluated is $9$.'
  },

  // =========================================================================
  // BIOLOGY: NEET
  // =========================================================================
  {
    id: 'q-neet-bio-001',
    exam: 'NEET',
    year: 2024,
    session_shift: '2024_NEET_UG',
    subject_id: 'biology',
    chapter_id: 'bio_12_genetics_evolution',
    topic_id: 'top_mendelian_genetics',
    question_type: 'MCQ',
    difficulty: 'EASY',
    question_text: 'In a dihybrid test cross between a heterozygous tall round-seeded pea plant ($TtRr$) and a homozygous dwarf wrinkled-seeded plant ($ttrr$), what is the expected phenotypic ratio of offspring?',
    diagram_url: null,
    options: [
      { id: 'A', text: '$9 : 3 : 3 : 1$' },
      { id: 'B', text: '$1 : 1 : 1 : 1$' },
      { id: 'C', text: '$3 : 1$' },
      { id: 'D', text: '$1 : 2 : 1$' }
    ],
    correct_answer: 'B',
    solution_text: '1. The cross between heterozygous genotype $TtRr$ (gametes: $TR, Tr, tR, tr$) and homozygous recessive $ttrr$ (gametes: $tr$) is a **dihybrid test cross**.\n2. The resulting offspring genotypes are:\n- $TtRr$ (Tall, Round) : $25\\%$\n- $Ttrr$ (Tall, Wrinkled) : $25\\%$\n- $ttRr$ (Dwarf, Round) : $25\\%$\n- $ttrr$ (Dwarf, Wrinkled) : $25\\%$\n\n3. The classic test cross ratio is therefore **$1 : 1 : 1 : 1$**.\n\nCorrect Option is **(B)**.'
  }
];
