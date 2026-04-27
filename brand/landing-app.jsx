
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "zen",
  "heroSize": 88,
  "showEnso": true,
  "lang": "nl"
}/*EDITMODE-END*/;

function LandingApp() {
  const { tweaks, setTweak } = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const handler = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.style.fontSize = tweaks.heroSize + 'px';
  }, [tweaks.heroSize]);

  useEffect(() => {
    const enso = document.querySelector('.enso');
    if (enso) enso.style.display = tweaks.showEnso ? 'block' : 'none';
  }, [tweaks.showEnso]);

  useEffect(() => {
    const heroLabel = document.querySelector('.hero-label');
    const heroBody = document.querySelector('.hero-body');
    const ctaPrimary = document.querySelector('.hero-cta a.btn-primary');
    const ctaGhost = document.querySelector('.hero-cta a.btn-ghost');
    if (tweaks.lang === 'en') {
      if (heroBody) heroBody.textContent = "We build systems that do the work you don't need to do. Repetitive, clicking, copying, entering, checking — gone.";
      if (ctaPrimary) ctaPrimary.textContent = 'Schedule a call';
      if (ctaGhost) ctaGhost.textContent = 'What we do';
    } else {
      if (heroBody) heroBody.textContent = 'Wij bouwen systemen die het werk doen dat jij niet hoeft te doen. Repetitief, klikken, kopiëren, invoeren, checken — dat verdwijnt.';
      if (ctaPrimary) ctaPrimary.textContent = 'Gesprek inplannen';
      if (ctaGhost) ctaGhost.textContent = 'Wat we doen';
    }
  }, [tweaks.lang]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (tweaks.layout === 'structured') {
      body.style.setProperty('--parchment', '#F5F2EC');
    } else {
      body.style.setProperty('--parchment', '#EFE6D6');
    }
  }, [tweaks.layout]);

  return (
    <TweaksPanel>
      <TweakSection title="Layout">
        <TweakRadio id="layout" label="Variant" options={[{value:'zen',label:'Zen'},{value:'structured',label:'Strak'}]} />
      </TweakSection>
      <TweakSection title="Typografie">
        <TweakSlider id="heroSize" label="Hero grootte" min={48} max={120} step={4} />
      </TweakSection>
      <TweakSection title="Elementen">
        <TweakToggle id="showEnso" label="Enso cirkel" />
      </TweakSection>
      <TweakSection title="Taal">
        <TweakRadio id="lang" label="Taal" options={[{value:'nl',label:'NL'},{value:'en',label:'EN'}]} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<LandingApp />);
