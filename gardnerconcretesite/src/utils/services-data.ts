// src/utils/services-data.ts

export interface Service {
  /** URL-friendly identifier used for routing, e.g. /services/{slug} */
  slug: string;
  /** Display name for the service */
  name: string;
  /** Emoji or icon code to visually distinguish the service */
  emoji: string;
  /** Short tagline shown on the landing page card */
  tagline: string;
  /** List of quick-hit highlights shown on landing page */
  highlights: string[];
  /** Hero image shown on landing page card */
  imageUrl: string;
  /** Longer blurb for dedicated service pages (can include multiple paragraphs). */
  blurb: string;
  seoTitle: string;
  seoDescription: string;
  faqs: { q: string; a: string }[];
  
  // New comprehensive sections
  /** What is X section - detailed explanation */
  whatIs: {
    title: string;
    content: string;
    benefits: string[];
  };
  
  /** Problem signs section */
  problemSigns: {
    title: string;
    description: string;
    signs: { sign: string; description: string; urgency: 'low' | 'medium' | 'high' }[];
  };
  
  /** Causes section */
  causes: {
    title: string;
    description: string;
    causes: { cause: string; description: string; prevention?: string }[];
  };
  
  /** Solutions section */
  solutions: {
    title: string;
    description: string;
    approaches: { 
      name: string; 
      description: string; 
      pros: string[]; 
      cons?: string[];
      bestFor: string;
      cost: 'low' | 'medium' | 'high';
      duration: string;
    }[];
  };
  
  /** Is X right for me section */
  isRightForMe: {
    title: string;
    description: string;
    goodCandidates: string[];
    notIdealFor: string[];
    considerations: string[];
  };
  
  /** Why is X needed section */
  whyNeeded: {
    title: string;
    description: string;
    consequences: { issue: string; shortTerm: string; longTerm: string }[];
    benefits: { benefit: string; description: string }[];
  };
  
  /** Common tips and mistakes */
  tipsAndMistakes: {
    title: string;
    tips: { tip: string; description: string; importance: 'high' | 'medium' | 'low' }[];
    mistakes: { mistake: string; why: string; consequence: string }[];
  };
  
  /** Location-specific information */
  locationInfo: {
    title: string;
    description: string;
    topAreas: {
      area: string;
      whyCommon: string;
      specificChallenges: string[];
    }[];
    climateFactors: string[];
    soilConditions?: string[];
  };
  
  /** Related blog tags for fetching relevant content */
  blogTags: string[];
  
  /** Internal linking structure */
  relatedServices: string[]; // slugs of related services
  
  /** Schema.org data */
  schema: {
    serviceType: string;
    areaServed: string[];
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
}

export const services: Service[] = [
  {
    slug: "foundation-repair",
    name: "Foundation Repair",
    emoji: "🏚️",
    tagline: "Stabilize bowed, cracked or buckling walls before they become dangerous.",
    highlights: [
      "Bowed & buckling wall repair",
      "Cracked wall restoration",
      "Block core-filling & resurfacing"
    ],
    imageUrl: "https://images.unsplash.com/photo-1621905252472-e52b5485b3f9?auto=format&fit=crop&w=800&q=80",
    seoTitle: "Foundation Repair Minneapolis & St Paul | Bowed & Cracked Wall Experts",
    seoDescription: "Licensed foundation repair contractor serving Minneapolis–St Paul. We fix bowed, cracked, settling walls and restore structural integrity. Free inspection & 0 % financing.",
    faqs: [
      { q: "How do I know if my foundation wall is failing?", a: "Common signs include horizontal cracks, bowing or bulging walls, doors that stick, and water infiltration. Our free inspection pinpoints the cause." },
      { q: "Does homeowner's insurance cover foundation repair?", a: "Most policies exclude normal settlement. We provide detailed reports you can submit to your carrier if damage was sudden or from a covered peril." },
      { q: "How long does a typical wall stabilization take?", a: "Most projects are completed in 2-4 days, depending on wall length and access." },
      { q: "What causes foundation walls to bow inward?", a: "Hydrostatic pressure from groundwater and expansive clay soil are the primary causes. Poor drainage and freeze-thaw cycles compound the problem." },
      { q: "Can I sell my house with foundation problems?", a: "Yes, but disclosure is required and it significantly impacts value. Professional repair increases marketability and eliminates liability concerns." }
    ],
    blurb: `Are any of your foundation walls bowed, buckling, or damaged? Ignoring the problem could be costly and even dangerous. Since 1949, G. Gardner Concrete & Waterproofing, Inc. has delivered dependable, licensed, and insured foundation repair services.\n\nOur solutions include bowed-wall stabilization, cracked-wall repairs, block core-filling, and interior or exterior wall resurfacing that eliminates cracks and crumbling surfaces.`,
    
    whatIs: {
      title: "What is Foundation Repair?",
      content: "Foundation repair encompasses various techniques to restore structural integrity to damaged foundation walls and footings. In Minneapolis and St. Paul, where expansive clay soil and extreme freeze-thaw cycles create unique challenges, foundation repair often involves addressing bowed walls, horizontal cracks, and settlement issues that threaten your home's stability and safety.",
      benefits: [
        "Prevents catastrophic wall collapse",
        "Eliminates water infiltration routes", 
        "Preserves home value and marketability",
        "Ensures structural safety for your family",
        "Prevents secondary damage to floors and framing"
      ]
    },
    
    problemSigns: {
      title: "Warning Signs Your Foundation Needs Repair",
      description: "Foundation problems rarely develop overnight. Recognizing early warning signs can save thousands in repair costs and prevent dangerous structural failure.",
      signs: [
        { sign: "Horizontal cracks in basement walls", description: "Most serious sign indicating structural failure from soil pressure", urgency: "high" },
        { sign: "Bowing or buckling walls", description: "Visible inward curvature of basement walls, especially near the middle", urgency: "high" },
        { sign: "Sticking doors and windows", description: "Frames become misaligned as foundation settles or shifts", urgency: "medium" },
        { sign: "Stair-step cracks in block walls", description: "Follow mortar joints and indicate differential settlement", urgency: "medium" },
        { sign: "Water entering through foundation cracks", description: "Compromised structural integrity allows moisture infiltration", urgency: "high" },
        { sign: "Gaps between walls and ceiling/floor", description: "Indicates significant structural movement", urgency: "medium" },
        { sign: "Bouncy or uneven floors", description: "May indicate foundation settlement affecting floor support", urgency: "low" }
      ]
    },
    
    causes: {
      title: "What Causes Foundation Problems in Minneapolis?",
      description: "Understanding the root causes helps prevent future issues and informs the most effective repair approach.",
      causes: [
        { 
          cause: "Expansive Clay Soil", 
          description: "Minneapolis sits on clay-rich soil that swells when wet and shrinks when dry, creating constant pressure against foundation walls",
          prevention: "Maintain consistent soil moisture with proper drainage and grading"
        },
        { 
          cause: "Hydrostatic Pressure", 
          description: "Groundwater buildup exerts tremendous force against basement walls, especially during spring thaw",
          prevention: "Install proper drainage systems and waterproofing"
        },
        { 
          cause: "Freeze-Thaw Cycles", 
          description: "Minnesota's extreme temperature swings cause soil expansion and foundation movement",
          prevention: "Ensure proper insulation and frost protection"
        },
        { 
          cause: "Poor Drainage", 
          description: "Water pooling near foundations increases soil pressure and creates erosion",
          prevention: "Maintain gutters, downspouts, and proper yard grading"
        },
        { 
          cause: "Age and Settlement", 
          description: "Foundations naturally settle over time, but differential settlement causes structural issues",
          prevention: "Regular professional inspections and maintenance"
        }
      ]
    },
    
    solutions: {
      title: "Foundation Repair Solutions",
      description: "We offer multiple repair approaches tailored to your specific foundation issues and budget.",
      approaches: [
        {
          name: "Carbon Fiber Wall Reinforcement",
          description: "High-strength carbon fiber strips bonded to walls prevent further bowing and provide long-term stabilization",
          pros: ["Minimal disruption to basement space", "Prevents further movement", "Cost-effective for early-stage problems"],
          cons: ["Cannot reverse existing bowing", "Requires dry conditions for installation"],
          bestFor: "Walls with less than 2 inches of bowing and minimal cracking",
          cost: "medium",
          duration: "1-2 days"
        },
        {
          name: "Steel I-Beam Installation",
          description: "Steel beams anchored to foundation and floor joists provide maximum reinforcement for severely damaged walls",
          pros: ["Handles severe damage", "Can potentially straighten walls", "Provides maximum strength"],
          cons: ["Reduces basement space", "Higher cost", "More invasive installation"],
          bestFor: "Walls with significant bowing or structural damage",
          cost: "high",
          duration: "2-4 days"
        },
        {
          name: "Wall Anchor Systems",
          description: "Anchors installed outside the foundation connect to wall plates inside, providing adjustable reinforcement",
          pros: ["Can gradually straighten walls", "Adjustable over time", "Effective for various soil conditions"],
          cons: ["Requires exterior excavation", "May impact landscaping"],
          bestFor: "Homes with accessible exterior space and moderate to severe wall damage",
          cost: "high",
          duration: "3-5 days"
        },
        {
          name: "Crack Injection Repair",
          description: "Polyurethane or epoxy injection seals cracks and restores structural integrity",
          pros: ["Quick and affordable", "Prevents water infiltration", "Minimal disruption"],
          bestFor: "Non-structural cracks and water infiltration issues",
          cost: "low",
          duration: "Same day"
        }
      ]
    },
    
    isRightForMe: {
      title: "Is Foundation Repair Right for Your Home?",
      description: "Not all foundation issues require immediate repair, but understanding when action is necessary protects your investment.",
      goodCandidates: [
        "Homes with visible wall bowing or horizontal cracks",
        "Properties experiencing water infiltration through foundation walls", 
        "Houses with doors and windows that stick or won't close properly",
        "Basements with new or expanding cracks in walls or floors",
        "Homes being prepared for sale (foundation issues must be disclosed)"
      ],
      notIdealFor: [
        "Superficial hairline cracks with no structural significance",
        "Issues that can be resolved with improved drainage alone",
        "Homes where cost of repair exceeds property value increase"
      ],
      considerations: [
        "Severity and progression rate of damage",
        "Age and overall condition of your home",
        "Local soil conditions and drainage situation",
        "Your long-term plans for the property",
        "Budget and financing options available"
      ]
    },
    
    whyNeeded: {
      title: "Why Foundation Repair is Critical",
      description: "Foundation problems don't improve on their own and often accelerate over time, making early intervention crucial.",
      consequences: [
        { 
          issue: "Structural Collapse", 
          shortTerm: "Increased bowing and cracking", 
          longTerm: "Potential catastrophic wall failure requiring emergency evacuation" 
        },
        { 
          issue: "Water Damage", 
          shortTerm: "Moisture infiltration and mold growth", 
          longTerm: "Extensive structural damage, health hazards, and reduced air quality" 
        },
        { 
          issue: "Decreased Property Value", 
          shortTerm: "Difficulty selling or refinancing", 
          longTerm: "Loss of equity and increased repair costs" 
        }
      ],
      benefits: [
        { 
          benefit: "Structural Safety", 
          description: "Ensures your family's safety by preventing wall collapse and maintaining structural integrity" 
        },
        { 
          benefit: "Property Value Protection", 
          description: "Maintains and often increases home value while ensuring marketability" 
        },
        { 
          benefit: "Moisture Control", 
          description: "Eliminates water infiltration routes, preventing mold and secondary damage" 
        },
        { 
          benefit: "Peace of Mind", 
          description: "Confidence in your home's stability and safety for years to come" 
        }
      ]
    },
    
    tipsAndMistakes: {
      title: "Foundation Repair Tips and Common Mistakes",
      tips: [
        { 
          tip: "Address drainage issues first", 
          description: "Fix gutters, downspouts, and grading before repair to prevent future problems",
          importance: "high"
        },
        { 
          tip: "Get multiple professional opinions", 
          description: "Foundation repair is complex; compare diagnoses and solutions from licensed contractors",
          importance: "high"
        },
        { 
          tip: "Document everything", 
          description: "Photos and measurements help track changes and support insurance claims",
          importance: "medium"
        },
        { 
          tip: "Consider timing", 
          description: "Dry conditions are ideal for most repair methods",
          importance: "low"
        }
      ],
      mistakes: [
        { 
          mistake: "Ignoring the problem", 
          why: "Foundation issues worsen over time and become more expensive to fix",
          consequence: "Higher repair costs and potential safety hazards"
        },
        { 
          mistake: "DIY foundation repair", 
          why: "Requires specialized knowledge, tools, and materials",
          consequence: "Ineffective repairs, safety risks, and voided warranties"
        },
        { 
          mistake: "Choosing the cheapest option", 
          why: "Foundation repair quality varies significantly between contractors",
          consequence: "Failed repairs, additional costs, and continued structural problems"
        },
        { 
          mistake: "Fixing symptoms, not causes", 
          why: "Without addressing root causes, problems return quickly",
          consequence: "Repeated repairs and escalating damage"
        }
      ]
    },
    
    locationInfo: {
      title: "Foundation Repair in Minneapolis-St. Paul",
      description: "Local soil conditions and climate create unique foundation challenges requiring specialized expertise.",
      topAreas: [
        {
          area: "South Minneapolis (Powderhorn, Longfellow)",
          whyCommon: "Older homes built on clay soil with limited modern drainage systems",
          specificChallenges: ["Historic construction methods", "Limited access for repairs", "Mature trees affecting soil moisture"]
        },
        {
          area: "Highland-Mac-Groveland (St. Paul)",
          whyCommon: "High groundwater table and steep grades create drainage issues",
          specificChallenges: ["Hillside drainage problems", "Mixed soil conditions", "Varied foundation types"]
        },
        {
          area: "Northeast Minneapolis",
          whyCommon: "Industrial history and clay soil composition",
          specificChallenges: ["Stone and block foundations", "Contaminated soil concerns", "Varied construction periods"]
        }
      ],
      climateFactors: [
        "Extreme freeze-thaw cycles causing soil expansion and contraction",
        "Heavy spring runoff overwhelming drainage systems",
        "Clay soil that becomes saturated during wet periods",
        "Temperature swings of 100+ degrees between winter and summer"
      ],
      soilConditions: [
        "Expansive bentonite clay that swells dramatically when wet",
        "Variable soil composition within single properties", 
        "High groundwater table in many areas",
        "Historic fill material in some neighborhoods"
      ]
    },
    
    blogTags: ["foundation-repair", "basement-waterproofing", "minneapolis-homes", "structural-integrity", "home-maintenance"],
    relatedServices: ["waterproofing", "concrete-work"],
    
    schema: {
      serviceType: "Foundation Repair Service",
      areaServed: ["Minneapolis", "St. Paul", "Twin Cities Metro", "Hennepin County", "Ramsey County"],
      aggregateRating: {
        ratingValue: 4.8,
        reviewCount: 150
      }
    }
  },
  {
    slug: "concrete-work",
    name: "Concrete Work",
    emoji: "🧱",
    tagline: "Patios, driveways, steps & more — built to enhance curb appeal and last for decades.",
    highlights: [
      "Patios, sidewalks & steps",
      "Garage & suspended slabs",
      "Driveways & basement floors"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    seoTitle: "Concrete Contractor Minneapolis | Patios, Driveways & Suspended Garage Floors",
    seoDescription: "Custom concrete patios, decorative walkways, garage slabs & steps in the Twin Cities. 75+ years of craftsmanship. Request your free quote today.",
    faqs: [
      { q: "What is a suspended garage floor?", a: "A structural concrete slab poured over open space, allowing storage or living area below while supporting full vehicle load above. It's engineered with proper reinforcement and load calculations for maximum safety." },
      { q: "Do you offer stamped or colored concrete?", a: "Yes. We offer multiple stamp patterns including slate, stone, brick, and wood textures, plus integral color options. Decorative concrete adds curb appeal while maintaining durability." },
      { q: "How soon can I drive on a new driveway?", a: "Standard mixes reach sufficient strength in 7 days; high-early mixes may allow 3-day access. We'll provide specific timing based on weather conditions and concrete specifications." },
      { q: "How thick should my concrete driveway be?", a: "Residential driveways typically require 4-6 inches, depending on soil conditions and expected loads. We evaluate your specific site for proper specifications." },
      { q: "What's the difference between concrete and asphalt driveways?", a: "Concrete lasts 25-30 years vs. asphalt's 15-20 years, requires less maintenance, and offers more design options. Initial cost is higher but long-term value is superior." },
      { q: "Can you pour concrete in winter?", a: "Yes, with proper precautions. We use heated enclosures, accelerated mixes, and curing blankets to ensure quality results even in Minnesota winters." }
    ],
    blurb: `Would you like new concrete walkways, beautiful new steps, or a patio for relaxing and entertaining? From aprons and sidewalks to suspended garage floors and stamped patios, we pour and finish durable concrete that boosts the value and beauty of your property.`,
    
    whatIs: {
      title: "What is Professional Concrete Construction?",
      content: "Professional concrete construction is far more than mixing cement and water. It's a precise science involving proper mix design, reinforcement placement, finishing techniques, and curing processes specifically engineered for Minnesota's extreme climate. Our 75+ years of experience ensures every project meets structural requirements while enhancing your property's beauty and value.",
      benefits: [
        "Increases property value by 8-15% for quality installations",
        "Provides 25-30 year lifespan with proper installation", 
        "Enhances curb appeal with decorative options",
        "Creates functional outdoor living spaces",
        "Requires minimal maintenance compared to other materials",
        "Withstands Minnesota's freeze-thaw cycles when properly installed"
      ]
    },
    
    problemSigns: {
      title: "Signs You Need New Concrete Work",
      description: "Recognizing when existing concrete needs replacement or when new construction is needed can prevent safety hazards and maximize your investment.",
      signs: [
        { sign: "Severe cracking or spalling", description: "Large cracks, chipped edges, or exposed aggregate indicate structural failure and safety hazards", urgency: "high" },
        { sign: "Uneven or settling surfaces", description: "Trip hazards and water pooling that can cause foundation issues or accidents", urgency: "high" },
        { sign: "Water pooling or drainage issues", description: "Improper slope directing water toward your home's foundation", urgency: "medium" },
        { sign: "Staining and discoloration", description: "Permanent stains that cleaning cannot remove, affecting curb appeal", urgency: "low" },
        { sign: "Outdated or inadequate surfaces", description: "Insufficient size for current needs or outdated appearance hurting property value", urgency: "low" },
        { sign: "Safety code violations", description: "Steps without proper handrails or surfaces that don't meet current building codes", urgency: "medium" },
        { sign: "Functional limitations", description: "Lack of accessible routes, inadequate parking, or missing outdoor entertainment areas", urgency: "low" }
      ]
    },
    
    causes: {
      title: "What Causes Concrete Deterioration in Minneapolis?",
      description: "Understanding the specific challenges concrete faces in our climate helps ensure proper design and longevity for new installations.",
      causes: [
        { 
          cause: "Freeze-Thaw Cycling", 
          description: "Minnesota's temperature swings cause water in concrete to expand and contract up to 100+ times per year, creating internal pressure that causes cracking and spalling",
          prevention: "Proper air entrainment (4-7% air bubbles), adequate concrete strength (4000+ PSI), and quality sealers"
        },
        { 
          cause: "De-icing Salt Damage", 
          description: "Road salt penetrates concrete pores, accelerating freeze-thaw damage and causing surface scaling and rebar corrosion",
          prevention: "Use of salt-resistant sealers, proper drainage, and choosing rock salt alternatives when possible"
        },
        { 
          cause: "Poor Subgrade Preparation", 
          description: "Inadequate base preparation or unstable soil causes uneven settling, leading to cracks and structural failure",
          prevention: "Proper excavation, compacted gravel base, and soil analysis before installation"
        },
        { 
          cause: "Inadequate Reinforcement", 
          description: "Insufficient or improperly placed rebar and wire mesh leads to cracking under load and temperature stress",
          prevention: "Engineering-specified reinforcement placement and proper concrete cover"
        },
        { 
          cause: "Improper Curing", 
          description: "Rapid drying or freezing during initial cure prevents concrete from reaching full strength and durability",
          prevention: "Controlled curing with proper moisture retention and temperature protection"
        },
        { 
          cause: "Wrong Mix Design", 
          description: "Concrete not formulated for local conditions fails prematurely under Minnesota's climate stresses",
          prevention: "Climate-specific mix designs with appropriate cement content, aggregates, and additives"
        }
      ]
    },
    
    solutions: {
      title: "Comprehensive Concrete Solutions",
      description: "We offer a full range of concrete services tailored to Minneapolis homes and designed to last decades in our challenging climate.",
      approaches: [
        {
          name: "Decorative Concrete Patios",
          description: "Custom-designed outdoor living spaces with stamped patterns, integral color, and protective sealers that resist Minnesota weather",
          pros: ["Unlimited design possibilities", "Increases property value significantly", "Low maintenance requirements", "Slip-resistant textures available"],
          cons: ["Higher initial cost than plain concrete", "Requires periodic sealing"],
          bestFor: "Homeowners wanting beautiful, functional outdoor entertainment areas",
          cost: "medium",
          duration: "3-5 days"
        },
        {
          name: "Driveway Construction & Replacement",
          description: "Heavy-duty residential driveways engineered for Minnesota's climate with proper thickness, reinforcement, and drainage",
          pros: ["25-30 year lifespan", "Supports heavy loads", "Multiple finish options", "Increases curb appeal"],
          cons: ["Higher upfront cost than asphalt", "7-day cure time before use"],
          bestFor: "Long-term homeowners wanting permanent, low-maintenance driveways",
          cost: "medium",
          duration: "2-4 days"
        },
        {
          name: "Suspended Garage Floors",
          description: "Engineered structural slabs that create usable space below while supporting full vehicle loads above",
          pros: ["Maximizes usable space", "Provides weather protection", "Allows basement access", "Custom load specifications"],
          cons: ["Complex engineering required", "Higher cost than slab-on-grade"],
          bestFor: "Homes with basement garages or need for additional storage/living space",
          cost: "high",
          duration: "5-7 days"
        },
        {
          name: "Steps & Walkway Construction",
          description: "Safe, code-compliant steps and walkways with proper slope, drainage, and slip-resistant finishes",
          pros: ["Improved safety and accessibility", "Custom dimensions", "Decorative options available", "Long-lasting durability"],
          cons: ["May require permits for major changes"],
          bestFor: "Improving home accessibility and curb appeal",
          cost: "low",
          duration: "1-3 days"
        },
        {
          name: "Basement Floor Installation",
          description: "Level, moisture-resistant basement floors with proper vapor barriers and drainage integration",
          pros: ["Creates finished living space", "Moisture resistant", "Easy to clean and maintain", "Improves home value"],
          cons: ["Requires proper waterproofing system"],
          bestFor: "Basement finishing projects and moisture control",
          cost: "medium",
          duration: "2-4 days"
        }
      ]
    },
    
    isRightForMe: {
      title: "Is Professional Concrete Work Right for Your Project?",
      description: "Quality concrete work is a significant investment that provides decades of value when done correctly. Understanding whether professional installation fits your situation ensures the best outcome.",
      goodCandidates: [
        "Homeowners planning to stay 5+ years to recoup investment",
        "Properties needing durable, permanent surfaces for high-traffic areas", 
        "Projects requiring structural integrity (driveways, suspended slabs)",
        "Situations where permits and code compliance are required",
        "Homeowners wanting low-maintenance, long-term solutions",
        "Properties where appearance and curb appeal are important",
        "Projects in challenging soil conditions or harsh climate exposure"
      ],
      notIdealFor: [
        "Temporary or short-term surface needs",
        "Extremely tight budgets where asphalt might be more appropriate",
        "Projects with very limited access for concrete trucks and equipment",
        "Situations requiring immediate use (concrete needs 7+ days to cure)",
        "Areas with frequent underground utility changes"
      ],
      considerations: [
        "Budget for quality installation vs. long-term value",
        "Timeline for project completion and cure time",
        "Local permit requirements and HOA restrictions",
        "Seasonal timing for optimal installation conditions",
        "Integration with existing landscape and drainage",
        "Future property improvement plans",
        "Maintenance commitment and expectations"
      ]
    },
    
    whyNeeded: {
      title: "Why Professional Concrete Installation is Critical",
      description: "The difference between amateur and professional concrete work becomes apparent within the first few Minnesota winters. Quality installation prevents costly failures and maximizes your investment.",
      consequences: [
        { 
          issue: "DIY or Inexperienced Installation", 
          shortTerm: "Visible imperfections, improper finishing, inadequate thickness", 
          longTerm: "Premature cracking, structural failure, complete replacement needed within 5-10 years" 
        },
        { 
          issue: "Substandard Materials or Mix", 
          shortTerm: "Initial savings, acceptable appearance", 
          longTerm: "Rapid deterioration, scaling, spalling, and expensive repairs or replacement" 
        },
        { 
          issue: "Inadequate Base Preparation", 
          shortTerm: "Lower upfront costs, faster installation", 
          longTerm: "Uneven settling, major cracks, water infiltration, and foundation damage" 
        },
        { 
          issue: "Poor Drainage Planning", 
          shortTerm: "Minimal additional cost savings", 
          longTerm: "Water damage to foundations, ice hazards, and premature concrete failure" 
        }
      ],
      benefits: [
        { 
          benefit: "Engineered Durability", 
          description: "Proper mix design, reinforcement, and installation techniques ensure 25-30 year lifespan in Minnesota's climate" 
        },
        { 
          benefit: "Code Compliance & Safety", 
          description: "Professional installation meets building codes, ADA requirements, and safety standards for liability protection" 
        },
        { 
          benefit: "Warranty & Accountability", 
          description: "Licensed contractors provide warranties and insurance protection for your investment" 
        },
        { 
          benefit: "Property Value Enhancement", 
          description: "Quality concrete work provides 8-15% return on investment and improves marketability" 
        },
        { 
          benefit: "Long-term Cost Savings", 
          description: "Professional installation eliminates costly repairs and early replacement, saving thousands over time" 
        }
      ]
    },
    
    tipsAndMistakes: {
      title: "Expert Concrete Tips and Common Mistakes",
      tips: [
        { 
          tip: "Plan for proper drainage", 
          description: "All concrete surfaces should slope away from buildings at 1/4 inch per foot minimum to prevent water damage",
          importance: "high"
        },
        { 
          tip: "Choose the right season", 
          description: "Late spring through early fall provides optimal conditions, though winter work is possible with proper precautions",
          importance: "high"
        },
        { 
          tip: "Invest in quality reinforcement", 
          description: "Proper rebar and wire mesh placement prevents cracking and extends lifespan significantly",
          importance: "high"
        },
        { 
          tip: "Plan for expansion joints", 
          description: "Control joints every 8-12 feet prevent random cracking and allow for thermal movement",
          importance: "medium"
        },
        { 
          tip: "Consider decorative options early", 
          description: "Stamping, coloring, and texturing must be planned before pouring and add significant value",
          importance: "medium"
        },
        { 
          tip: "Prepare for the full cure time", 
          description: "Concrete reaches full strength in 28 days; plan accordingly for heavy use",
          importance: "low"
        }
      ],
      mistakes: [
        { 
          mistake: "Choosing contractors based solely on price", 
          why: "Concrete work quality varies dramatically between contractors; cheap work often fails prematurely",
          consequence: "Complete replacement needed within 5-10 years instead of 25-30 years"
        },
        { 
          mistake: "Skipping permits for major projects", 
          why: "Building codes ensure safety and proper installation; unpermitted work can cause legal and insurance issues",
          consequence: "Fines, forced removal, insurance claim denials, and safety hazards"
        },
        { 
          mistake: "Ignoring soil and drainage conditions", 
          why: "Poor base preparation is the #1 cause of concrete failure in Minnesota",
          consequence: "Uneven settling, major cracks, and complete structural failure"
        },
        { 
          mistake: "Using concrete in freezing weather without protection", 
          why: "Concrete that freezes during initial cure never reaches full strength",
          consequence: "Permanent weakness, scaling, and premature failure requiring replacement"
        },
        { 
          mistake: "Attempting complex projects as DIY", 
          why: "Suspended slabs, large driveways, and decorative work require specialized knowledge and equipment",
          consequence: "Safety hazards, code violations, and expensive professional remediation"
        }
      ]
    },
    
    locationInfo: {
      title: "Concrete Work in Minneapolis-St. Paul Metro",
      description: "Local soil conditions, climate extremes, and municipal requirements create unique challenges requiring specialized knowledge and experience in the Twin Cities market.",
      topAreas: [
        {
          area: "South Minneapolis (Powderhorn, Longfellow, Nokomis)",
          whyCommon: "High concentration of older homes needing driveway replacement and patio additions for outdoor living",
          specificChallenges: ["Narrow lot access for concrete trucks", "Clay soil requiring extra base preparation", "Historic district restrictions on materials and appearance", "Mature tree roots affecting excavation"]
        },
        {
          area: "Highland Park & Mac-Groveland (St. Paul)",
          whyCommon: "Affluent neighborhoods investing in high-end decorative concrete and outdoor entertainment areas",
          specificChallenges: ["Steep grades requiring specialized forming", "High groundwater table affecting drainage", "Strict architectural review requirements", "Premium finish expectations"]
        },
        {
          area: "Edina & Southwest Metro Suburbs",
          whyCommon: "New construction and luxury home improvements requiring suspended garage floors and custom patios",
          specificChallenges: ["Large-scale projects with complex engineering", "HOA approval processes", "Integration with high-end landscaping", "Premium material and finish requirements"]
        },
        {
          area: "Northeast Minneapolis & Suburbs",
          whyCommon: "Industrial area transitioning to residential with unique foundation and access challenges",
          specificChallenges: ["Contaminated soil requiring special handling", "Limited access streets", "Mixed residential/commercial zoning requirements", "Utility conflicts from industrial past"]
        }
      ],
      climateFactors: [
        "Temperature swings from -30°F to 100°F creating extreme thermal stress",
        "100+ freeze-thaw cycles per year requiring air-entrained concrete",
        "Heavy spring snowmelt creating drainage and soil saturation issues",
        "Intense summer heat requiring careful curing and timing",
        "High humidity affecting surface finishing and cure rates",
        "Severe winter storms requiring protective measures during construction"
      ],
      soilConditions: [
        "Expansive bentonite clay that swells up to 30% when wet, requiring deep excavation and proper base",
        "Mixed glacial soils with varying drainage and bearing capacity within single properties",
        "Seasonal groundwater fluctuations affecting basement floors and drainage design",
        "Organic topsoil layers requiring complete removal for structural applications",
        "Historic fill material in some areas requiring soil analysis and special preparation",
        "Bedrock variations from 2-50 feet affecting excavation costs and techniques"
      ]
    },
    
    blogTags: ["concrete-work", "patios", "driveways", "home-improvement", "minneapolis-concrete", "outdoor-living", "suspended-garage-floors"],
    relatedServices: ["foundation-repair", "waterproofing"],
    
    schema: {
      serviceType: "Concrete Construction Service",
      areaServed: ["Minneapolis", "St. Paul", "Twin Cities Metro", "Hennepin County", "Ramsey County", "Edina", "Highland Park"],
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 200
      }
    }
  },
  {
    slug: "waterproofing",
    name: "Waterproofing",
    emoji: "💧",
    tagline: "Complete basement moisture protection and water management systems for Minneapolis homes",
    highlights: [
      "Interior & exterior drain systems",
      "Sump pump installation & repair", 
      "Foundation wall treatments"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    seoTitle: "Basement Waterproofing Minneapolis | Drain-Tile & Sump Pump Pros",
    seoDescription: "Professional basement waterproofing services in Minneapolis. Interior drain tile, sump pumps, exterior systems. Licensed & insured since 1949.",
    faqs: [
      { q: "What's the difference between interior and exterior waterproofing?", a: "Interior systems manage water that reaches your foundation by collecting and redirecting it away from your home. Exterior systems prevent water from reaching the foundation at all. Interior is less disruptive and more cost-effective, while exterior offers maximum protection but requires extensive excavation." },
      { q: "How long does basement waterproofing last?", a: "Quality interior drain tile systems last 25-30 years with minimal maintenance. Sump pumps typically need replacement every 7-10 years. Our systems come with transferable warranties and we provide ongoing maintenance programs." },
      { q: "Can you waterproof a finished basement?", a: "Yes, though it requires careful planning. We can install interior systems with minimal disruption by accessing the perimeter through strategic floor cuts. We work with your schedule to preserve finished areas where possible." },
      { q: "Do I need a sump pump if I have drain tile?", a: "In Minneapolis, yes. Our clay soil, high water table, and spring runoff require active water removal. The drain tile collects water; the sump pump removes it. Battery backup systems are highly recommended for power outages during storms." },
      { q: "Will waterproofing increase my home's value?", a: "Absolutely. A dry, usable basement adds 10-20% to your home's value and makes it much more marketable. Moisture problems are major red flags for buyers and often deal-breakers during inspections." },
      { q: "How much disruption will waterproofing cause?", a: "Interior systems require 2-4 inches of concrete removal around the basement perimeter. Most homes remain livable during installation. We use dust control measures and complete most projects in 2-3 days." }
    ],
    blurb: `Stop water before it damages your basement. Our comprehensive waterproofing systems protect Minneapolis homes from groundwater, surface water, and humidity issues that plague basements in our climate.`,
    
    whatIs: {
      title: "What is Professional Basement Waterproofing?",
      content: "Professional basement waterproofing is a comprehensive moisture management system that prevents water infiltration, controls groundwater, and maintains optimal humidity levels in your basement. Unlike simple DIY solutions, professional systems are engineered specifically for Minneapolis's unique challenges: clay soil that retains water, dramatic seasonal temperature swings, and heavy spring runoff from snow melt. Our 75+ years of experience ensures your system handles everything from minor seepage to major groundwater issues.",
      benefits: [
        "Creates dry, usable living space worth 15-20% more in home value",
        "Prevents mold, mildew, and associated health problems",
        "Protects structural integrity by preventing water-related foundation damage",
        "Reduces basement humidity by 40-60%, improving air quality throughout home",
        "Eliminates water damage to stored items and finished basement areas",
        "Provides peace of mind during Minneapolis's intense spring thaws and summer storms"
      ]
    },
    
    problemSigns: {
      title: "Signs Your Minneapolis Home Needs Waterproofing",
      description: "Minneapolis's clay soil, high water table, and extreme weather create unique basement moisture challenges. Recognizing these signs early prevents major damage and health hazards.",
      signs: [
        { sign: "White chalky residue on walls (efflorescence)", description: "Mineral deposits left by evaporating water indicate chronic moisture infiltration through foundation walls", urgency: "high" },
        { sign: "Musty odors or visible mold growth", description: "Persistent moisture creates ideal conditions for mold and mildew, creating health hazards and indicating water infiltration", urgency: "high" },
        { sign: "Water stains or discoloration on walls", description: "Brown, yellow, or dark stains on foundation walls show current or past water problems that will worsen", urgency: "high" },
        { sign: "Standing water after rain or snow melt", description: "Pooling water in basement corners or floors indicates inadequate drainage and immediate action needed", urgency: "high" },
        { sign: "Rust on metal fixtures or appliances", description: "High humidity levels cause premature rusting of furnaces, water heaters, and electrical components", urgency: "medium" },
        { sign: "Peeling paint or wallpaper in basement", description: "Moisture causes adhesive failure and surface deterioration, indicating humidity problems", urgency: "medium" },
        { sign: "Damp feeling or condensation on surfaces", description: "Excessive humidity makes basement uncomfortable and creates conditions for mold growth", urgency: "medium" },
        { sign: "Cracks in foundation walls with water seepage", description: "Even small cracks can allow significant water infiltration during Minneapolis's spring thaw", urgency: "high" }
      ]
    },
    
    causes: {
      title: "Why Minneapolis Basements Have Water Problems",
      description: "Understanding the specific causes of basement moisture in our region helps ensure your waterproofing system addresses all potential water sources effectively.",
      causes: [
        { 
          cause: "Clay Soil Water Retention", 
          description: "Minneapolis sits on expansive clay soil that absorbs water during spring thaw and summer rains, then slowly releases it against foundation walls for months. This constant moisture pressure finds every crack and pore in your foundation.",
          prevention: "Proper exterior drainage, interior drain tile systems, and foundation wall treatments that handle hydrostatic pressure"
        },
        { 
          cause: "High Water Table Fluctuations", 
          description: "Our proximity to the Mississippi River and numerous lakes creates a high, fluctuating water table. Spring snow melt can raise groundwater levels 3-6 feet, putting enormous pressure on basement floors and walls.",
          prevention: "Sub-slab drainage systems, sump pumps with battery backup, and hydrostatic pressure relief valves"
        },
        { 
          cause: "Extreme Freeze-Thaw Cycles", 
          description: "Minnesota's temperature swings from -20°F to 90°F create foundation cracks as materials expand and contract. Each crack becomes a pathway for water infiltration during spring thaw.",
          prevention: "Foundation crack repair combined with comprehensive waterproofing to handle inevitable future settling"
        },
        { 
          cause: "Heavy Spring Runoff", 
          description: "Rapid snow melt combined with spring rains can overwhelm drainage systems, causing water to accumulate around foundations. Poor grading directs this water directly toward basement walls.",
          prevention: "Proper grading, gutter maintenance, and comprehensive drainage systems that handle peak flow periods"
        },
        { 
          cause: "Inadequate Original Drainage", 
          description: "Many Minneapolis homes built before 1980 lack adequate drainage systems or have drain tile that has failed over time. Original systems often can't handle current weather patterns.",
          prevention: "Complete drainage system upgrades with modern materials and proper slopes designed for current climate conditions"
        },
        { 
          cause: "Foundation Settlement", 
          description: "Clay soil expansion and contraction causes foundations to settle unevenly, creating cracks and gaps. This is especially common in homes built on poorly compacted fill soil.",
          prevention: "Foundation stabilization combined with flexible waterproofing systems that accommodate minor movement"
        }
      ]
    },
    
    solutions: {
      title: "Comprehensive Waterproofing Solutions for Minneapolis Homes",
      description: "Our waterproofing systems are specifically designed for Minneapolis's challenging groundwater conditions, clay soil characteristics, and extreme weather patterns.",
      approaches: [
        {
          name: "Interior Drain Tile Systems",
          description: "Sub-slab perimeter drainage that intercepts groundwater before it enters your basement, directing it to a sump pump for removal. The most cost-effective solution for most Minneapolis homes.",
          pros: ["Minimal exterior disruption", "Works year-round", "Handles high water table fluctuations", "Cost-effective for most situations", "Can be installed in finished basements"],
          cons: ["Requires concrete floor removal", "Doesn't prevent exterior foundation moisture", "Relies on sump pump operation"],
          bestFor: "Most Minneapolis homes with groundwater issues, high water tables, or multiple foundation wall entry points",
          cost: "medium",
          duration: "2-3 days"
        },
        {
          name: "Exterior Waterproofing & Drain Tile",
          description: "Complete excavation and exterior foundation treatment with drainage systems that prevent water from ever reaching your foundation walls. Maximum protection for severe cases.",
          pros: ["Prevents all water contact with foundation", "Handles extreme hydrostatic pressure", "Long-term comprehensive solution", "Protects foundation structure"],
          cons: ["Requires extensive excavation", "Higher cost", "Disrupts landscaping", "Weather-dependent installation"],
          bestFor: "Severe water problems, new construction, or homes with significant foundation moisture damage",
          cost: "high",
          duration: "5-7 days"
        },
        {
          name: "Sump Pump Systems with Battery Backup",
          description: "High-capacity pumps designed for Minneapolis's heavy spring runoff, with battery backup systems for power outages during storms when you need protection most.",
          pros: ["Handles large volumes of water", "Operates during power outages", "Automatic operation", "Essential for high water table areas"],
          cons: ["Requires electrical connection", "Periodic maintenance needed", "Can fail without backup power"],
          bestFor: "All Minneapolis homes with waterproofing systems, especially those in low-lying areas or near water bodies",
          cost: "low",
          duration: "1 day"
        },
        {
          name: "Foundation Wall Treatments",
          description: "Specialized coatings and membranes applied to interior foundation walls to prevent moisture infiltration and reduce humidity levels in finished basements.",
          pros: ["Improves air quality", "Prevents efflorescence", "Protects finished basement areas", "Reduces overall basement humidity"],
          cons: ["Doesn't handle major water infiltration", "Surface preparation required", "May need reapplication over time"],
          bestFor: "Finished basements with minor moisture issues or as part of comprehensive waterproofing systems",
          cost: "low",
          duration: "1-2 days"
        },
        {
          name: "French Drain Installation",
          description: "Exterior drainage systems that redirect surface water away from your foundation before it can infiltrate. Essential for proper water management around Minneapolis homes.",
          pros: ["Prevents surface water infiltration", "Protects landscaping", "Reduces hydrostatic pressure", "Long-lasting solution"],
          cons: ["Requires landscape modification", "May need periodic maintenance", "Not effective for groundwater issues"],
          bestFor: "Homes with surface water drainage problems or as part of comprehensive exterior waterproofing",
          cost: "medium", 
          duration: "2-3 days"
        }
      ]
    },
    
    isRightForMe: {
      title: "Is Basement Waterproofing Right for Your Minneapolis Home?",
      description: "Determining the right waterproofing approach depends on your specific moisture issues, home age, and long-term plans. Not all basement moisture requires the same solution.",
      goodCandidates: [
        "Homes with visible water infiltration or standing water in basement",
        "Properties with finished basements experiencing moisture damage",
        "Houses in low-lying areas or near bodies of water",
        "Basements with persistent musty odors or mold growth",
        "Homes being prepared for sale (moisture issues are major buyer concerns)",
        "Properties with valuable items stored in basement areas",
        "Houses with HVAC equipment in basement requiring protection"
      ],
      notIdealFor: [
        "Completely dry basements with no moisture history",
        "Properties where cost exceeds home value increase",
        "Homes with minor condensation issues that can be resolved with dehumidification",
        "Basements used only for utilities with no finished space plans"
      ],
      considerations: [
        "Severity and frequency of water problems",
        "Age and construction type of your foundation",
        "Local water table levels and seasonal variations",
        "Current and planned use of basement space",
        "Budget and financing options available",
        "Long-term residence plans and home value goals"
      ]
    },
    
    whyNeeded: {
      title: "Why Waterproofing is Essential for Minneapolis Homes",
      description: "Minneapolis's unique climate and soil conditions make basement waterproofing not just beneficial, but essential for protecting your investment and family's health.",
      consequences: [
        { 
          issue: "Mold and Health Problems", 
          shortTerm: "Respiratory issues and allergic reactions from mold spores", 
          longTerm: "Chronic health problems, especially for children and elderly. Potential liability issues if health problems develop" 
        },
        { 
          issue: "Structural Foundation Damage", 
          shortTerm: "Efflorescence and surface deterioration of foundation walls", 
          longTerm: "Foundation wall failure, floor slab cracking, and potential structural collapse requiring emergency repairs" 
        },
        { 
          issue: "Property Value Loss", 
          shortTerm: "Difficulty selling and failed home inspections", 
          longTerm: "15-25% reduction in home value and complete unmarketability during wet seasons" 
        },
        { 
          issue: "Electrical and HVAC Damage", 
          shortTerm: "Rust and corrosion of mechanical systems in basement", 
          longTerm: "Complete system failure, fire hazards, and expensive emergency replacements" 
        }
      ],
      benefits: [
        { 
          benefit: "Healthy Living Environment", 
          description: "Eliminates mold, mildew, and moisture-related allergens, creating safe air quality throughout your home" 
        },
        { 
          benefit: "Increased Property Value", 
          description: "Dry, usable basements add 15-20% to home value and make properties significantly more marketable" 
        },
        { 
          benefit: "Protected Investment", 
          description: "Prevents costly foundation repairs and protects expensive HVAC, electrical, and plumbing systems" 
        },
        { 
          benefit: "Usable Living Space", 
          description: "Transforms basement into comfortable recreation, storage, or living areas adding functional square footage" 
        },
        { 
          benefit: "Peace of Mind", 
          description: "Confidence during Minneapolis's heavy spring thaws and summer storms, knowing your basement will stay dry" 
        }
      ]
    },
    
    tipsAndMistakes: {
      title: "Expert Waterproofing Tips & Common Mistakes",
      tips: [
        { tip: "Address exterior drainage first", description: "Fix gutters, downspouts, and grading before interior systems. Reducing water load makes any waterproofing system more effective and longer-lasting.", importance: "high" },
        { tip: "Install battery backup sump pumps", description: "Power outages during storms are common in Minneapolis. Battery backup ensures protection when you need it most during severe weather.", importance: "high" },
        { tip: "Seal foundation cracks immediately", description: "Small cracks become major water entry points during spring thaw. Professional injection sealing prevents minor issues from becoming major problems.", importance: "high" },
        { tip: "Maintain proper basement humidity", description: "Keep basement humidity below 50% with dehumidification. This prevents condensation issues and makes waterproofing systems more effective.", importance: "medium" },
        { tip: "Regular system maintenance", description: "Annual sump pump testing and drain tile inspection prevents system failures. Small maintenance prevents major emergency repairs.", importance: "medium" },
        { tip: "Choose appropriate materials", description: "Use materials designed for Minneapolis clay soil and freeze-thaw cycles. Standard systems from other climates often fail in Minnesota conditions.", importance: "high" }
      ],
      mistakes: [
        { mistake: "Using interior paint-on sealers as sole solution", why: "Paint sealers only address minor surface moisture, not hydrostatic pressure from groundwater", consequence: "Continued water infiltration and sealer failure within 1-2 years" },
        { mistake: "Installing inadequate sump pump capacity", why: "Minneapolis spring runoff requires high-capacity pumps, not standard residential units", consequence: "Pump failure during peak demand leading to basement flooding" },
        { mistake: "Ignoring exterior drainage issues", why: "Interior systems can't handle unlimited water load from poor exterior drainage", consequence: "System overload, premature failure, and continued moisture problems" },
        { mistake: "DIY drain tile installation", why: "Proper slopes, materials, and connection details require professional expertise", consequence: "System failure, standing water, and expensive re-installation" },
        { mistake: "Delaying repairs during dry periods", why: "Water problems appear cyclical but infrastructure damage continues even when basement seems dry", consequence: "Major system failure during next wet period requiring emergency repairs" },
        { mistake: "Choosing lowest-bid contractors", why: "Waterproofing systems are only as good as installation quality and material selection", consequence: "System failure, voided warranties, and complete re-installation costs" }
      ]
    },
    
    locationInfo: {
      title: "Waterproofing Challenges Specific to Minneapolis-St. Paul",
      description: "The Twin Cities present unique waterproofing challenges due to our geography, soil composition, and extreme climate variations that require specialized solutions.",
      topAreas: [
        { 
          area: "South Minneapolis (Powderhorn, Phillips, Longfellow)", 
          whyCommon: "Low elevation areas with high water table and older homes built before modern drainage standards", 
          specificChallenges: ["Spring flooding from nearby lakes", "Clay soil water retention", "Pre-1950s foundations with limited drainage", "High density housing affecting drainage patterns"] 
        },
        { 
          area: "Northeast Minneapolis (Como, Marcy-Holmes, Beltrami)", 
          whyCommon: "Industrial fill soil and proximity to Mississippi River creates groundwater pressure issues", 
          specificChallenges: ["Contaminated fill soil affecting drainage", "River proximity raising water table", "Mixed foundation types requiring different approaches", "Industrial area drainage overwhelming residential systems"] 
        },
        { 
          area: "Highland Park & Summit Hill (St. Paul)", 
          whyCommon: "Historic homes on hillsides experience unique drainage patterns and foundation settling", 
          specificChallenges: ["Sloped lots creating surface water issues", "Historic stone foundations requiring specialized treatment", "Mature tree roots affecting drainage systems", "City drainage systems overloaded during heavy rains"] 
        },
        { 
          area: "Western Suburbs (Edina, Plymouth, Minnetonka)", 
          whyCommon: "Clay soil expansion/contraction cycles and newer development on poorly compacted soil", 
          specificChallenges: ["New construction on unstable fill", "Clay soil movement cracking foundations", "Suburban sprawl affecting natural drainage", "Higher property values requiring premium solutions"] 
        }
      ],
      climateFactors: [
        "Spring snow melt creating 2-4 weeks of extreme groundwater pressure annually",
        "Clay soil freeze-thaw cycles causing foundation movement and new crack formation",
        "Summer thunderstorms delivering 3-6 inches of rain in short periods, overwhelming drainage",
        "Winter freeze affecting exterior drainage systems and creating ice dam water backup",
        "Fall saturation periods where soil reaches maximum water retention before freeze",
        "Temperature swings of 120°F between winter lows and summer highs affecting foundation materials"
      ],
      soilConditions: [
        "Expansive clay soil that retains water for months after precipitation events",
        "High plasticity clay that swells 15-20% when saturated, creating foundation pressure",
        "Poorly drained glacial lake bed deposits common throughout Twin Cities metro",
        "Mixed soil conditions requiring different drainage approaches within single neighborhoods",
        "Bedrock proximity variations affecting groundwater flow and drainage effectiveness",
        "Urban fill soil with unknown composition affecting traditional waterproofing approaches"
      ]
    },
    blogTags: ["waterproofing", "basement-repair", "moisture-control", "minneapolis-homes"],
    relatedServices: ["foundation-repair", "concrete-work"],
    schema: { serviceType: "Waterproofing Service", areaServed: ["Minneapolis", "St. Paul", "Edina", "Plymouth", "Minnetonka", "Bloomington"] }
  }
];

export default services; 