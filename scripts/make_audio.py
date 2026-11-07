"""Genera música y efectos originales (sin copyright) para los Shorts."""
import numpy as np, wave, os, sys
SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public")

def save(name, x):
    x = np.clip(x, -1, 1)
    st = np.stack([x, x], axis=1) if x.ndim == 1 else x
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    e = np.minimum(1, t / a) * np.exp(-t / r)
    return e

def note(f): return 440 * 2 ** ((f - 69) / 12)
rng = np.random.default_rng(3)

def music(seconds, bpm, chords, seed):
    rng = np.random.default_rng(seed)
    n = int(seconds * SR); out = np.zeros(n)
    beat = 60 / bpm; bar = beat * 4
    t_all = np.arange(n) / SR
    # pads
    for i in range(int(seconds / bar) + 1):
        ch = chords[i % len(chords)]
        s = int(i * bar * SR); e = min(n, int((i + 1) * bar * SR))
        if s >= n: break
        t = np.arange(e - s) / SR
        pad = sum(np.sin(2 * np.pi * note(m) * t) + 0.3 * np.sin(2 * np.pi * note(m) * 2.003 * t) for m in ch)
        fade = np.minimum(1, t / 0.4) * np.minimum(1, (bar - t) / 0.3)
        out[s:e] += 0.045 * pad * fade
        # bass
        b = np.sin(2 * np.pi * note(ch[0] - 12) * t) * np.exp(-((t % beat) / 0.5))
        out[s:e] += 0.16 * b
        # arp (pluck)
        for k in range(8):
            ts = int(k * beat / 2 * SR)
            if s + ts >= e: break
            m = ch[(k * 2 + i) % len(ch)] + 12
            L = min(int(0.35 * SR), e - s - ts)
            tt = np.arange(L) / SR
            out[s + ts:s + ts + L] += 0.05 * np.sin(2 * np.pi * note(m) * tt) * env(L, 0.002, 0.12)
    # drums
    nb = int(seconds / beat)
    for k in range(nb):
        s = int(k * beat * SR)
        if k % 2 == 0:  # kick
            L = min(int(0.3 * SR), n - s); t = np.arange(L) / SR
            f = 50 + 90 * np.exp(-t * 30)
            out[s:s + L] += 0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
        else:  # snare/clap
            L = min(int(0.2 * SR), n - s); t = np.arange(L) / SR
            out[s:s + L] += 0.12 * rng.standard_normal(L) * np.exp(-t * 22)
        for h in (0, 0.5):  # hats
            hs = int((k + h) * beat * SR); L = min(int(0.05 * SR), n - hs)
            if L > 0:
                hn = rng.standard_normal(L); hn = hn - np.convolve(hn, np.ones(4) / 4, "same")
                out[hs:hs + L] += 0.05 * hn * np.exp(-np.arange(L) / SR * 80)
    fade = np.minimum(1, t_all / 0.3) * np.minimum(1, (seconds - t_all) / 1.0)
    out *= fade
    return out / max(1e-9, np.abs(out).max()) * 0.8

save("music-curious.wav", music(34, 96, [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], 1))
save("music-tension.wav", music(34, 104, [[50, 53, 57], [46, 50, 53], [53, 57, 60], [52, 56, 59]], 2))
save("music-chill.wav", music(34, 90, [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], 3))
save("music-explica.wav", music(44, 92, [[62, 65, 69], [58, 62, 65], [60, 64, 67], [57, 60, 64]], 4))

# SFX
L = int(0.12 * SR); t = np.arange(L) / SR
save("pop.wav", 0.7 * np.sin(2 * np.pi * np.cumsum(900 - 500 * t / t[-1]) / SR) * env(L, 0.002, 0.04))
L = int(0.45 * SR); t = np.arange(L) / SR
nz = rng.standard_normal(L); sweep = np.sin(np.pi * t / t[-1]) ** 2
k = np.ones(12) / 12; wh = np.convolve(nz, k, "same") * sweep
save("whoosh.wav", 0.8 * wh / np.abs(wh).max())
L = int(1.2 * SR); t = np.arange(L) / SR
ding = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * d) for f, a, d in [(1318, 1, 3), (2637, .4, 5), (3951, .2, 7)])
save("ding.wav", 0.5 * ding / np.abs(ding).max() * np.minimum(1, t / 0.003))
L = int(0.04 * SR); t = np.arange(L) / SR
save("tick.wav", 0.5 * np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 120))
L = int(0.5 * SR); t = np.arange(L) / SR
boom = np.sin(2 * np.pi * np.cumsum(40 + 120 * np.exp(-t * 12)) / SR) * np.exp(-t * 5)
save("boom.wav", 0.9 * boom)
print("ok")
