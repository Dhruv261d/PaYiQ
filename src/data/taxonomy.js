/**
 * Universal Syllabus & Taxonomy Tree for All Indian & Global Competitive Exams
 * Categorized into Engineering, Medical, Civil/Govt Services, Law & Management, and Custom.
 */

export const EXAM_CATEGORIES = [
  { id: 'engineering', name: 'Engineering Entrances', icon: 'Cpu' },
  { id: 'medical', name: 'Medical Entrances', icon: 'Dna' },
  { id: 'govt_civil', name: 'Govt & Civil Services', icon: 'GraduationCap' },
  { id: 'law_mgmt', name: 'Law & Management', icon: 'Scale' },
  { id: 'custom', name: 'Custom / Other Exam', icon: 'Sparkles' },
];

export const EXAMS = [
  // ================= ENGINEERING =================
  { id: 'JEE_MAIN', name: 'JEE Main', category: 'engineering', description: 'NTA Engineering Entrance', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'JEE_ADVANCED', name: 'JEE Advanced', category: 'engineering', description: 'IIT Entrance Exam', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'MHT_CET', name: 'MHT-CET', category: 'engineering', description: 'Maharashtra State CET', subjects: ['physics', 'chemistry', 'mathematics', 'biology'] },
  { id: 'BITSAT', name: 'BITSAT', category: 'engineering', description: 'BITS Pilani Entrance', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'WBJEE', name: 'WBJEE', category: 'engineering', description: 'West Bengal Joint Entrance', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'KCET', name: 'KCET', category: 'engineering', description: 'Karnataka CET', subjects: ['physics', 'chemistry', 'mathematics', 'biology'] },
  { id: 'COMEDK', name: 'COMEDK UGET', category: 'engineering', description: 'Consortium of Medical & Engg Colleges', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'VITEEE', name: 'VITEEE', category: 'engineering', description: 'VIT Engineering Entrance', subjects: ['physics', 'chemistry', 'mathematics'] },
  { id: 'GATE', name: 'GATE', category: 'engineering', description: 'Graduate Aptitude Test in Engineering', subjects: ['physics', 'mathematics'] },

  // ================= MEDICAL =================
  { id: 'NEET', name: 'NEET UG', category: 'medical', description: 'National Eligibility cum Entrance Test', subjects: ['physics', 'chemistry', 'biology'] },
  { id: 'INI_CET', name: 'INI-CET / AIIMS', category: 'medical', description: 'Institute of National Importance CET', subjects: ['biology', 'chemistry'] },

  // ================= GOVT & CIVIL SERVICES =================
  { id: 'UPSC_CSE', name: 'UPSC Civil Services (Prelims)', category: 'govt_civil', description: 'UPSC IAS/IPS Prelims GS & CSAT', subjects: ['general_studies', 'aptitude'] },
  { id: 'SSC_CGL', name: 'SSC CGL', category: 'govt_civil', description: 'Staff Selection Commission Combined Graduate Level', subjects: ['mathematics', 'aptitude', 'general_studies'] },
  { id: 'NDA_CDS', name: 'NDA & CDS', category: 'govt_civil', description: 'National Defence Academy & Combined Defence Services', subjects: ['mathematics', 'general_studies'] },

  // ================= LAW & MANAGEMENT =================
  { id: 'CLAT', name: 'CLAT', category: 'law_mgmt', description: 'Common Law Admission Test', subjects: ['aptitude', 'general_studies'] },
  { id: 'CAT', name: 'CAT', category: 'law_mgmt', description: 'Common Admission Test (IIMs)', subjects: ['mathematics', 'aptitude'] },
  { id: 'CUET', name: 'CUET UG / PG', category: 'law_mgmt', description: 'Common University Entrance Test', subjects: ['physics', 'chemistry', 'mathematics', 'biology', 'general_studies'] },

  // ================= CUSTOM =================
  { id: 'CUSTOM_EXAM', name: 'Custom / Other Exam', category: 'custom', description: 'Any State / University / Competitive Exam', subjects: ['physics', 'chemistry', 'mathematics', 'biology', 'general_studies', 'aptitude'] },
];

export const SUBJECTS = [
  { id: 'physics', name: 'Physics', code: 'PHY', icon: 'Atom', color: 'indigo' },
  { id: 'chemistry', name: 'Chemistry', code: 'CHEM', icon: 'FlaskConical', color: 'emerald' },
  { id: 'mathematics', name: 'Mathematics', code: 'MATH', icon: 'Pi', color: 'amber' },
  { id: 'biology', name: 'Biology', code: 'BIO', icon: 'Dna', color: 'rose' },
  { id: 'general_studies', name: 'General Studies & Science', code: 'GS', icon: 'BookOpen', color: 'cyan' },
  { id: 'aptitude', name: 'Logical Reasoning & Quantitative Aptitude', code: 'APT', icon: 'Zap', color: 'purple' },
];

export const CHAPTERS = [
  // ================= PHYSICS CLASS 11 =================
  { id: 'phy_11_units', subjectId: 'physics', classLevel: 11, unit: 'General Physics', name: 'Units, Dimensions and Measurements' },
  { id: 'phy_11_kinematics_1d_2d', subjectId: 'physics', classLevel: 11, unit: 'Mechanics', name: 'Motion in a Straight Line & Plane' },
  { id: 'phy_11_nlom', subjectId: 'physics', classLevel: 11, unit: 'Mechanics', name: 'Laws of Motion & Friction' },
  { id: 'phy_11_wep', subjectId: 'physics', classLevel: 11, unit: 'Mechanics', name: 'Work, Energy and Power' },
  { id: 'phy_11_rotational', subjectId: 'physics', classLevel: 11, unit: 'Mechanics', name: 'System of Particles & Rotational Motion' },
  { id: 'phy_11_gravitation', subjectId: 'physics', classLevel: 11, unit: 'Mechanics', name: 'Gravitation' },
  { id: 'phy_11_solids_fluids', subjectId: 'physics', classLevel: 11, unit: 'Properties of Bulk Matter', name: 'Mechanical Properties of Solids & Fluids' },
  { id: 'phy_11_thermal_thermo', subjectId: 'physics', classLevel: 11, unit: 'Thermodynamics', name: 'Thermal Properties & Thermodynamics' },
  { id: 'phy_11_ktg', subjectId: 'physics', classLevel: 11, unit: 'Thermodynamics', name: 'Kinetic Theory of Gases' },
  { id: 'phy_11_shm_waves', subjectId: 'physics', classLevel: 11, unit: 'Oscillations & Waves', name: 'Oscillations (SHM) and Waves' },

  // ================= PHYSICS CLASS 12 =================
  { id: 'phy_12_electrostatics', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Electrostatics & Potential' },
  { id: 'phy_12_capacitance', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Current Electricity' },
  { id: 'phy_12_moving_charges', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Moving Charges and Magnetism' },
  { id: 'phy_12_mag_matter', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Magnetism and Matter' },
  { id: 'phy_12_emi_ac', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Electromagnetic Induction & Alternating Current' },
  { id: 'phy_12_em_waves', subjectId: 'physics', classLevel: 12, unit: 'Electrodynamics', name: 'Electromagnetic Waves' },
  { id: 'phy_12_ray_optics', subjectId: 'physics', classLevel: 12, unit: 'Optics', name: 'Ray Optics and Optical Instruments' },
  { id: 'phy_12_wave_optics', subjectId: 'physics', classLevel: 12, unit: 'Optics', name: 'Wave Optics' },
  { id: 'phy_12_dual_nature', subjectId: 'physics', classLevel: 12, unit: 'Modern Physics', name: 'Dual Nature of Radiation and Matter' },
  { id: 'phy_12_atoms_nuclei', subjectId: 'physics', classLevel: 12, unit: 'Modern Physics', name: 'Atoms and Nuclei' },
  { id: 'phy_12_semiconductors', subjectId: 'physics', classLevel: 12, unit: 'Modern Physics', name: 'Semiconductor Electronics & Logic Gates' },

  // ================= CHEMISTRY CLASS 11 & 12 =================
  { id: 'chem_11_mole', subjectId: 'chemistry', classLevel: 11, unit: 'Physical Chemistry', name: 'Some Basic Concepts of Chemistry (Mole Concept)' },
  { id: 'chem_11_structure_atom', subjectId: 'chemistry', classLevel: 11, unit: 'Physical Chemistry', name: 'Structure of Atom' },
  { id: 'chem_11_chemical_bonding', subjectId: 'chemistry', classLevel: 11, unit: 'Inorganic Chemistry', name: 'Chemical Bonding and Molecular Structure' },
  { id: 'chem_11_thermodynamics', subjectId: 'chemistry', classLevel: 11, unit: 'Physical Chemistry', name: 'Chemical Thermodynamics' },
  { id: 'chem_11_equilibrium', subjectId: 'chemistry', classLevel: 11, unit: 'Physical Chemistry', name: 'Equilibrium (Chemical & Ionic)' },
  { id: 'chem_11_goc', subjectId: 'chemistry', classLevel: 11, unit: 'Organic Chemistry', name: 'General Organic Chemistry (GOC)' },
  { id: 'chem_12_solutions', subjectId: 'chemistry', classLevel: 12, unit: 'Physical Chemistry', name: 'Solutions' },
  { id: 'chem_12_electrochem', subjectId: 'chemistry', classLevel: 12, unit: 'Physical Chemistry', name: 'Electrochemistry' },
  { id: 'chem_12_kinetics', subjectId: 'chemistry', classLevel: 12, unit: 'Physical Chemistry', name: 'Chemical Kinetics' },
  { id: 'chem_12_coordination', subjectId: 'chemistry', classLevel: 12, unit: 'Inorganic Chemistry', name: 'Coordination Compounds' },
  { id: 'chem_12_aldehydes_ketones', subjectId: 'chemistry', classLevel: 12, unit: 'Organic Chemistry', name: 'Aldehydes, Ketones and Carboxylic Acids' },

  // ================= MATHEMATICS CLASS 11 & 12 =================
  { id: 'math_11_trigonometry', subjectId: 'mathematics', classLevel: 11, unit: 'Trigonometry', name: 'Trigonometric Functions & Equations' },
  { id: 'math_11_quadratic', subjectId: 'mathematics', classLevel: 11, unit: 'Algebra', name: 'Complex Numbers & Quadratic Equations' },
  { id: 'math_11_permutations', subjectId: 'mathematics', classLevel: 11, unit: 'Algebra', name: 'Permutations and Combinations' },
  { id: 'math_12_matrices_det', subjectId: 'mathematics', classLevel: 12, unit: 'Algebra', name: 'Matrices and Determinants' },
  { id: 'math_12_aod', subjectId: 'mathematics', classLevel: 12, unit: 'Calculus', name: 'Applications of Derivatives (Tangents, Maxima-Minima)' },
  { id: 'math_12_definite_integral', subjectId: 'mathematics', classLevel: 12, unit: 'Calculus', name: 'Definite Integrals & Area Under Curves' },
  { id: 'math_12_vectors_3d', subjectId: 'mathematics', classLevel: 12, unit: 'Vector & 3D Geometry', name: 'Vectors and 3D Geometry' },
  { id: 'math_12_probability', subjectId: 'mathematics', classLevel: 12, unit: 'Probability', name: 'Probability & Bayes Theorem' },

  // ================= BIOLOGY CLASS 11 & 12 =================
  { id: 'bio_11_cell', subjectId: 'biology', classLevel: 11, unit: 'Cell Biology', name: 'Cell: Structure, Function & Cell Division' },
  { id: 'bio_11_human_physio', subjectId: 'biology', classLevel: 11, unit: 'Human Physiology', name: 'Human Physiology (Circulation, Excretion, Nervous)' },
  { id: 'bio_12_genetics_evolution', subjectId: 'biology', classLevel: 12, unit: 'Genetics & Evolution', name: 'Genetics and Molecular Basis of Inheritance' },
  { id: 'bio_12_biotechnology', subjectId: 'biology', classLevel: 12, unit: 'Biotechnology', name: 'Biotechnology: Principles and Applications' },

  // ================= GENERAL STUDIES & APTITUDE =================
  { id: 'gs_indian_polity', subjectId: 'general_studies', classLevel: 12, unit: 'Polity & Governance', name: 'Indian Constitution & Polity' },
  { id: 'gs_modern_history', subjectId: 'general_studies', classLevel: 12, unit: 'History', name: 'Modern Indian History & National Movement' },
  { id: 'gs_general_science', subjectId: 'general_studies', classLevel: 12, unit: 'General Science', name: 'Everyday Science & Technology' },
  { id: 'apt_logical_deduction', subjectId: 'aptitude', classLevel: 12, unit: 'Logical Reasoning', name: 'Syllogisms & Logical Deductions' },
  { id: 'apt_quantitative', subjectId: 'aptitude', classLevel: 12, unit: 'Quantitative Ability', name: 'Percentages, Ratios & Number Systems' },
];

export const TOPICS = [
  // Physics Topics
  { id: 'top_moment_of_inertia', chapterId: 'phy_11_rotational', name: 'Moment of Inertia & Parallel/Perpendicular Axes' },
  { id: 'top_angular_momentum', chapterId: 'phy_11_rotational', name: 'Conservation of Angular Momentum' },
  { id: 'top_rolling_motion', chapterId: 'phy_11_rotational', name: 'Rolling Motion on Incline' },
  { id: 'top_work_energy_thm', chapterId: 'phy_11_wep', name: 'Work-Energy Theorem & Conservative Forces' },
  { id: 'top_coulombs_law', chapterId: 'phy_12_electrostatics', name: 'Coulomb’s Law and Electric Field' },
  { id: 'top_photoelectric_effect', chapterId: 'phy_12_dual_nature', name: 'Photoelectric Effect & Einstein Equation' },

  // Chemistry Topics
  { id: 'top_mot_bond_order', chapterId: 'chem_11_chemical_bonding', name: 'Molecular Orbital Theory & Paramagnetism' },
  { id: 'top_aldol_cannizzaro', chapterId: 'chem_12_aldehydes_ketones', name: 'Aldol Condensation & Cannizzaro Reaction' },
  { id: 'top_nernst_equation', chapterId: 'chem_12_electrochem', name: 'Nernst Equation & Cell EMF' },

  // Mathematics Topics
  { id: 'top_definite_properties', chapterId: 'math_12_definite_integral', name: 'Properties of Definite Integrals (King’s Rule)' },
  { id: 'top_matrices_inverse', chapterId: 'math_12_matrices_det', name: 'Inverse of Matrix & System of Linear Equations' },
  { id: 'top_3d_lines_planes', chapterId: 'math_12_vectors_3d', name: 'Shortest Distance Between Skew Lines' },

  // Biology & Govt Topics
  { id: 'top_mendelian_genetics', chapterId: 'bio_12_genetics_evolution', name: 'Mendelian Dihybrid Cross & Linkage' },
  { id: 'top_fundamental_rights', chapterId: 'gs_indian_polity', name: 'Fundamental Rights & Judicial Review' },
  { id: 'top_syllogism', chapterId: 'apt_logical_deduction', name: 'Venn Diagram & Syllogistic Inference' },
];
