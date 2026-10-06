/* =====================================================================
   PORTFOLIO CONTENT FILE  (the ONLY file you need to edit)
   - Change text only between the "quote marks". Keep the commas.
   - Videos live in  public/videos/  -> write as  "/videos/FileName.mp4"
   - Images live in  public/images/  -> write as  "/images/FileName.jpg"
   - File names here must match the real files EXACTLY (capitals, spaces,
     spelling and the .mp4 / .jpg ending).
   - "ratio" on a video is its shape: "9:16", "4:5", "1:1", "16:9", "21:9"...
   - To ADD a project: copy one { ... }, block and paste it below.
   - To REMOVE one: delete its whole { ... }, block.
   ===================================================================== */

export const site = {
  name: "FRAMELOCK", // <- brand name shown top-left (change to anything you like)
  role: "AI Commercial Producers · Technical Art Directors",
  metaTitle: "Framelock | AI Commercial Production Studio",
  metaDescription:
    "High-conversion commercials in every aspect ratio, photorealistic architectural renderings and locked character pipelines.",
  links: [
    // Leave the list empty [] to hide social links.
    { label: "LinkedIn", url: "https://linkedin.com/in/your-handle" },
    { label: "Instagram", url: "https://instagram.com/your-handle" },
  ],
};

/* ---------------------------- HERO SECTION ---------------------------- */
export const hero = {
  headline: "We direct commercials that make people stop scrolling and start buying.",
  subheadline:
    "High-conversion reels and films in every aspect ratio, photorealistic architectural renderings and locked character turnaround pipelines, produced with AI and directed like cinema.",
  primaryCta: { label: "Start a production inquiry", href: "#contact" },
  secondaryCta: { label: "See the work", href: "#work" },
  highlights: ["Every aspect ratio", "Photoreal archviz", "Locked character pipelines"],
};

/* ------------------------ CAMPAIGNS (VIDEO WORK) ----------------------- */
export const campaigns = [
  {
    id: "dosti",
    sectionTitle: "Real estate campaigns",
    client: "Dosti Realty",
    intro:
      "Cinematic launch films for luxury residences and mega townships, built to turn a scroll into a site visit.",
    projects: [
      { title: "Greater Thane & Wagle Estate", tag: "Luxury 2 & 3 Bed Residences", ratio: "9:16", video: "/videos/DGT_3.mp4", poster: "" },
      { title: "West County", tag: "Mega Township", ratio: "9:16", video: "/videos/DWC_3.mp4", poster: "" },
      { title: "Eden", tag: "Mega Township", ratio: "9:16", video: "/videos/Dosti Eden_11.mp4", poster: "" },
      { title: "Will You Be My Yellow?", tag: "Dosti campaign film", ratio: "9:16", video: "/videos/DOST 604 V4_1.mp4", poster: "" },
    ],
  },
  {
    id: "truebalance",
    sectionTitle: "FinTech campaigns",
    client: "TrueBalance",
    intro:
      "Story-first advertising for a lending app, from the 10Cr+ Downloads campaign to everyday-life dialogue ads.",
    projects: [
      { title: "Home Renovation", tag: "Dialogue ad", ratio: "9:16", video: "/videos/TB Home Renovation Two Portrait_1.mp4", poster: "" },
      { title: "Cricket Stadium Dialogue", tag: "Dialogue ad", ratio: "9:16", video: "/videos/True Balance Cricket Three Portrait_1.mp4", poster: "" },
      { title: "Cricket Dialogue, Part Two", tag: "Narrative storytelling", ratio: "9:16", video: "/videos/True Balance Cricket Two Portrait_1.mp4", poster: "" },
      // To add the 10Cr+ Downloads Campaign, copy the line below, remove the // and set the file name:
      // { title: "10Cr+ Downloads Campaign", tag: "Milestone campaign", ratio: "9:16", video: "/videos/YourFile.mp4", poster: "" },
    ],
  },
];

/* --------------------------- ASPECT RATIOS ---------------------------- */
// "w" and "h" draw the little shape. "ratio" is the label shown (also used in the form).
export const formats = {
  title: "Every aspect ratio. Every platform.",
  intro:
    "We deliver the same campaign in every format the market uses, so one production covers every screen.",
  items: [
    { ratio: "9:16", w: 9, h: 16, use: "Reels, Shorts, TikTok, Stories" },
    { ratio: "4:5", w: 4, h: 5, use: "Instagram & Facebook feed" },
    { ratio: "1:1", w: 1, h: 1, use: "Square feed posts" },
    { ratio: "3:4", w: 3, h: 4, use: "Portrait feed & posters" },
    { ratio: "4:3", w: 4, h: 3, use: "Classic video & tablets" },
    { ratio: "16:9", w: 16, h: 9, use: "YouTube, TV & web" },
    { ratio: "1.91:1", w: 1.91, h: 1, use: "Link & display ads" },
    { ratio: "21:9", w: 21, h: 9, use: "Ultrawide & cinema screens" },
    { ratio: "2.39:1", w: 2.39, h: 1, use: "Anamorphic widescreen" },
  ],
};

/* ---------------------- AI CONSISTENCY ENGINE ------------------------- */
export const consistency = {
  title: "The AI Consistency Engine",
  intro:
    "AI characters usually drift: a new face in every shot. We lock each character with a 3-angle model sheet, so the same person appears in every frame of a campaign.",
  characters: [
    { name: "Amit", role: "Operations Manager, Martial Arts Dojo", image: "/images/Amit- Operations Manager- Martial Arts Dojo.jpg" },
    { name: "Arjun", role: "Child Swimmer", image: "/images/Arjun-Child Swimmer.jpg" },
    { name: "Kabir", role: "Martial Arts Coach", image: "/images/Kabir- Martial Arts Coach.jpg" },
    { name: "Majon", role: "Swimming Parent", image: "/images/Majon Swimming Parent.jpg" },
    { name: "Rajesh", role: "Academy Admin", image: "/images/Rajesh- Accademy Admin.jpg" },
    { name: "Rohan", role: "Head Football Coach", image: "/images/Rohan- head Football Coach.jpg" },
    { name: "Sameer", role: "Founder", image: "/images/Sameer - Founder.jpg" },
    { name: "Vikram", role: "Cricket Academy Admin", image: "/images/Vikram- Cricket Acedemy Admin.jpg" },
  ],
};

/* ------------------- PRE-VISUALIZATION & PIPELINE --------------------- */
export const previs = {
  title: "Pre-visualization & pipeline",
  storyboard: {
    title: "12-panel storyboard architecture",
    description:
      "Every reel is planned as twelve panels before a single frame is generated, so pacing, hooks and product moments are approved up front.",
    boards: [
      { title: "Reel 3: Student Management", image: "/images/Reel 3- Student Mangement.jpg" },
      { title: "Reel 4: Coach Management", image: "/images/Reel 4- Coach management.jpg" },
      { title: "Reel 5: Growth & Scaling", image: "/images/Reel 5- Growth & Scaling.jpg" },
      { title: "Reel 6: Parent's Experience", image: "/images/Reel 6- Parent's Exp.jpg" },
    ],
  },
  pipelineTitle: "The 6-stage AI production workflow",
  stages: [
    { name: "Hook Pacing", text: "The first three seconds are scripted to stop the scroll." },
    { name: "Beat Boards", text: "Story beats are mapped to the 12-panel storyboard." },
    { name: "Turnarounds", text: "Characters are locked with 3-angle model sheets." },
    { name: "Video Synthesis", text: "Shots are generated against the locked references." },
    { name: "VFX Tracking", text: "Product, text and set elements are tracked and composited." },
    { name: "Master Audio", text: "Voice, music and sound design are mixed for mobile speakers." },
  ],
};

/* ----------------------------- CONTACT -------------------------------- */
export const contact = {
  title: "Have a campaign to launch?",
  text: "Tell us about the product, the audience and the deadline. We will reply with a production plan.",
  // Enquiries go to BOTH addresses (the first one receives, the rest are copied)
  emails: ["vedant.d.bhaumik@gmail.com", "ashishsurwase@gmail.com"],
  formTitle: "Send us your enquiry",
  submitLabel: "Send enquiry",
  successText: "Thank you! Your enquiry has been sent. We will get back to you shortly.",
  errorText: "Something went wrong. Please try again, or use the Email Us button.",
  projectTypes: [
    "Real estate campaign",
    "FinTech or app campaign",
    "Product or brand film",
    "AI character pipeline",
    "Architectural visualization",
    "Something else",
  ],
  budgets: ["Under ₹1 lakh", "₹1 to 3 lakh", "₹3 to 10 lakh", "₹10 lakh and above", "Not sure yet"],
  emailButtonLabel: "Email Us",
  emailSubject: "Production enquiry",
  emailBody:
    "Hi team,\n\nWe would like to work with you.\n\nProject type:\nAspect ratios needed:\nDeadline:\nBudget:\nDetails:\n\nThank you,",
  footerNote: "Available for commercial productions worldwide.",
};
