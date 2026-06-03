export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CertLevel = typeof LEVELS[number];

/** XP required to earn each level's certificate */
export const CERT_XP: Record<CertLevel, number> = {
  A1: 150,
  A2: 400,
  B1: 800,
  B2: 1500,
  C1: 2500,
  C2: 4000,
};

export const CERT_LABEL: Record<CertLevel, string> = {
  A1: 'Начинаещ',
  A2: 'Елементарен',
  B1: 'Предсреден',
  B2: 'Среден',
  C1: 'Напреднал',
  C2: 'Владеещ',
};

/** Level → gradient colors for the certificate image */
export const CERT_GRADIENT: Record<CertLevel, [string, string]> = {
  A1: ['#2d6040', '#4a9465'],
  A2: ['#2d6040', '#4a9465'],
  B1: ['#1a4a6e', '#2a6ea8'],
  B2: ['#1a4a6e', '#2a6ea8'],
  C1: ['#4a2d80', '#7a4db8'],
  C2: ['#4a2d80', '#7a4db8'],
};

/** Badge background/foreground for each level */
export const CERT_BADGE: Record<CertLevel, { bg: string; fg: string }> = {
  A1: { bg: '#b5d8be', fg: '#2d6040' },
  A2: { bg: '#b5d8be', fg: '#2d6040' },
  B1: { bg: '#b4cfe4', fg: '#1a4a6e' },
  B2: { bg: '#b4cfe4', fg: '#1a4a6e' },
  C1: { bg: '#c9bce4', fg: '#4a2d80' },
  C2: { bg: '#c9bce4', fg: '#4a2d80' },
};

/** Returns which certificates a user has earned */
export function earnedCertificates(xp: number): CertLevel[] {
  return LEVELS.filter(l => xp >= CERT_XP[l]);
}

/** Returns the next certificate the user is working toward, if any */
export function nextCertificate(xp: number): { level: CertLevel; xpNeeded: number; progress: number } | null {
  const next = LEVELS.find(l => xp < CERT_XP[l]);
  if (!next) return null;
  const prev = LEVELS[LEVELS.indexOf(next) - 1];
  const from  = prev ? CERT_XP[prev] : 0;
  const to    = CERT_XP[next];
  return {
    level:     next,
    xpNeeded:  to - xp,
    progress:  Math.round(((xp - from) / (to - from)) * 100),
  };
}
