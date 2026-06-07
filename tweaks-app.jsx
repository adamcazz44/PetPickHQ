/* Tweaks app — mounts just the panel and applies values to :root CSS vars */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#D9764F", "#4E8A5F", "#2A2520", "#F7F2EA"],
  "headingFont": "Bricolage Grotesque",
  "heroLayout": "split",
  "roundness": 22,
  "showBadges": true
}/*EDITMODE-END*/;

const PALETTES = {
  "Terracotta + Sage": ["#D9764F", "#4E8A5F", "#2A2520", "#F7F2EA"],
  "Berry + Plum":      ["#C8517E", "#6D5AA6", "#2B2230", "#F6F0F4"],
  "Sky + Sand":        ["#3E83B8", "#E0A24B", "#1F2A33", "#F2F4F2"],
  "Forest + Clay":     ["#5A8F5A", "#C76A3E", "#23271F", "#F4F2EA"],
};

const HEAD_FONTS = ["Bricolage Grotesque", "Hanken Grotesk", "Space Grotesk", "Fraunces"];

function applyTweaks(t) {
  const root = document.documentElement;
  const [primary, secondary, ink, bg] = t.palette;
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--secondary", secondary);
  root.style.setProperty("--ink", ink);
  root.style.setProperty("--bg", bg);
  root.style.setProperty("--radius", t.roundness + "px");
  root.style.setProperty("--head-font", `"${t.headingFont}"`);
  root.setAttribute("data-hero", t.heroLayout);
  root.setAttribute("data-badges", t.showBadges ? "on" : "off");
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  const paletteName = Object.keys(PALETTES).find(
    (k) => PALETTES[k].join() === t.palette.join()
  ) || "Custom";

  return (
    <TweaksPanel>
      <TweakSection label="Theme" />
      <TweakColor
        label="Palette"
        value={t.palette}
        options={Object.values(PALETTES)}
        onChange={(v) => setTweak("palette", v)}
      />
      <TweakSection label="Typography" />
      <TweakSelect
        label="Heading font"
        value={t.headingFont}
        options={HEAD_FONTS}
        onChange={(v) => setTweak("headingFont", v)}
      />
      <TweakSection label="Layout" />
      <TweakRadio
        label="Hero"
        value={t.heroLayout}
        options={["split", "center"]}
        onChange={(v) => setTweak("heroLayout", v)}
      />
      <TweakSlider
        label="Roundness"
        value={t.roundness}
        min={4}
        max={32}
        unit="px"
        onChange={(v) => setTweak("roundness", v)}
      />
      <TweakToggle
        label="Editor badges"
        value={t.showBadges}
        onChange={(v) => setTweak("showBadges", v)}
      />
    </TweaksPanel>
  );
}

// Apply defaults immediately so the page looks right before React mounts.
applyTweaks(TWEAK_DEFAULTS);

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
