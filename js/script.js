// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  menuBtn.setAttribute("aria-expanded", String(menuOpen));
  if (menuOpen) {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    menuBtn.classList.add("open");
  } else {
    mobileMenu.style.maxHeight = "0px";
    menuBtn.classList.remove("open");
  }
}
menuBtn.addEventListener("click", toggleMenu);
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});

// Animate hamburger -> X
const style = document.createElement("style");
style.textContent = `
  #menuBtn.open .menu-line { transform: translateY(7px) rotate(45deg); }
  #menuBtn.open .menu-line-2 { opacity: 0; }
  #menuBtn.open .menu-line-3 { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(style);

// ---------- Navbar shadow on scroll ----------
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      navbar.classList.add("shadow-2xl");
    } else {
      navbar.classList.remove("shadow-2xl");
    }
  },
  { passive: true },
);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter(
          (c) =>
            c.classList.contains("reveal") ||
            c.classList.contains("reveal-left") ||
            c.classList.contains("reveal-right"),
        );
        const delay = Math.min(siblings.indexOf(el), 4) * 90;
        setTimeout(() => el.classList.add("is-visible"), delay);
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Hero floating icons ----------
const heroIcons = document.querySelectorAll(".hero-icon");
const heroStage = document.getElementById("heroStage");

// Reveal icons in on load with stagger, settle into their placed position
heroIcons.forEach((icon, i) => {
  const fromLeft = icon.dataset.from === "left";
  icon.style.transform = `translateX(${fromLeft ? "-60px" : "60px"}) translateY(10px)`;
  setTimeout(
    () => {
      icon.style.transition =
        "transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease";
      icon.style.opacity = "1";
      icon.style.transform = "translateX(0) translateY(0)";
    },
    300 + i * 130,
  );
});

// Subtle parallax drift as user scrolls past hero
function parallaxHero() {
  const rect = heroStage.getBoundingClientRect();
  const progress = 1 - Math.min(Math.max(rect.top / window.innerHeight, -1), 1); // -1..1 ish
  heroIcons.forEach((icon) => {
    const depth = parseFloat(icon.dataset.depth) || 0.2;
    const fromLeft = icon.dataset.from === "left";
    const shift = progress * 40 * depth * (fromLeft ? -1 : 1);
    icon.style.transform = `translateX(${shift}px) translateY(${progress * 22 * depth}px)`;
  });
}
window.addEventListener("scroll", () => requestAnimationFrame(parallaxHero), {
  passive: true,
});

// ---------- Services accordion (data-driven) ----------
const services = [
  {
    title: "Concurrent Audits of Banks",
    body: "Ongoing, real-time examination of banking transactions as they occur, helping banks identify lapses immediately rather than after the fact. We currently serve ICICI Bank, IndusInd Bank and RBL Bank branches and currency chests across Maharashtra, Gujarat and beyond.",
  },
  {
    title: "Income Tax",
    body: "End-to-end income tax compliance — return filing, assessment support, and advisory for individuals, partnerships and companies, structured to keep clients compliant and informed of every filing deadline.",
  },
  {
    title: "Certification & Attestation",
    body: "Statutory certificates, net worth certificates, and attestation services required for loans, tenders, visas and regulatory filings, prepared with the accuracy institutions expect.",
  },
  {
    title: "GST Consultation",
    body: "Practical guidance on GST registration, rate classification, input credit and notices — helping businesses navigate day-to-day GST questions before they become compliance issues.",
  },
  {
    title: "Goods and Service Tax Audit",
    body: "Detailed GST audits verifying returns, input tax credit claims and reconciliations against books of accounts, completed for clients across manufacturing, trading and services.",
  },
  {
    title: "Tax Audit",
    body: "Statutory tax audits under the Income Tax Act for businesses and professionals crossing prescribed turnover thresholds, delivered with the documentation rigour audits demand.",
  },
  {
    title: "Internal Audit",
    body: "Independent review of a business's internal controls, processes and risk management — including co-sourced internal audit assignments run across dozens of bank branches at a time.",
  },
  {
    title: "Stock Audit",
    body: "Physical and financial verification of inventory pledged against working capital limits, carried out for banks, to confirm stock value and condition.",
  },
  {
    title: "Statutory Audit",
    body: "Independent, legally mandated audit of financial statements to confirm they present a true and fair view as required under the Companies Act — covering verification of books, compliance checks and the final audit report every registered company must file.",
  },
];

const servicesList = document.getElementById("servicesList");
services.forEach((s, i) => {
  const item = document.createElement("div");
  item.className = "service-item reveal";
  item.innerHTML = `
    <button class="service-trigger w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group">
      <span class="flex items-center gap-5 md:gap-7">
        <span class="idx text-olive-light/70 text-sm md:text-base w-6">${String(i + 1).padStart(2, "0")}</span>
        <span class="font-display text-lg md:text-2xl text-paper group-hover:text-olive-light transition-colors">${s.title}</span>
      </span>
      <span class="service-chevron shrink-0 w-8 h-8 rounded-full border border-paper/25 flex items-center justify-center text-paper text-lg">+</span>
    </button>
    <div class="service-panel">
      <p class="text-paper/65 text-sm md:text-base leading-relaxed pb-7 pl-11 md:pl-[52px] max-w-2xl">${s.body}</p>
    </div>
  `;
  servicesList.appendChild(item);
  revealObserver.observe(item);

  item.querySelector(".service-trigger").addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    servicesList.querySelectorAll(".service-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".service-chevron").textContent = "+";
    });
    if (!wasOpen) {
      item.classList.add("open");
      item.querySelector(".service-chevron").textContent = "×";
    }
  });
});

// ---------- Client marquee ----------
const clientNames = [
  "Liberty Oil Mills Ltd",
  "Amardeep Aggregate Pvt Ltd",
  "Hotel Lake View",
  "Navsari Valsad Jilla Poultry Farm Co-op Society",
  "N R Beauty World",
  "Carter Corporation",
  "Mandarin International",
  "Amardeep Saw Mill",
  "Sahajanand Metals",
  "Ajanta Wood Products",
  "Amardeep Metals",
  "Harikrishna Concrete",
  "Doshi Enterprise",
  "Doshi Trading Company",
  "J K Metals",
  "Veritas Health Care Pvt Ltd",
  "Sahajanand Enterprise",
  "Windsons Chemicals Pvt Ltd",
  "Poshak Collection",
  "Bharat Corporation",
  "A K Garments",
  "Sandeep Traders",
  "Invogue",
  "Om Sai Enterprise",
  "Shivam Granite",
  "Eagle Trading Company",
  "XL Alugraphics",
];

const marqueeRow = document.getElementById("marqueeRow");
function buildMarqueeChip(name) {
  const chip = document.createElement("div");
  chip.className =
    "flex items-center gap-2.5 px-6 md:px-7 py-4 mx-2 rounded-full bg-white border border-hairline/60 whitespace-nowrap";
  chip.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-olive shrink-0"></span><span class="font-display text-navy text-sm md:text-base">${name}</span>`;
  return chip;
}
// duplicate list for seamless loop
[...clientNames, ...clientNames].forEach((name) =>
  marqueeRow.appendChild(buildMarqueeChip(name)),
);

// ---------- Contact form -> mailto ----------
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(`Enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
  );
  window.location.href = `mailto:ca.sohebginiyani@gmail.com?subject=${subject}&body=${body}`;
});
