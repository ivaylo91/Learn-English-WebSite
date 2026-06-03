export const CHALLENGE_XP = 25;

export type ChallengeModule = 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'writing';

export type DailyChallenge = {
  module:    ChallengeModule;
  title:     string;
  subtitle:  string;
  href:      string;
  contentId: string;
  xpBonus:   number;
  completed: boolean;
};
