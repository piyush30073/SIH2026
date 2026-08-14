export type FitnessGoal =
  | 'muscle-gain'
  | 'fat-loss'
  | 'performance'
  | 'recovery'
  | 'general-fitness'

export type RiskLevel = 'low' | 'moderate' | 'high'

export interface Athlete {
  id: string
  name: string
  email: string
  age: number
  height: number
  weight: number
  fitnessGoal: FitnessGoal
  injuryRiskScore: number
  riskLevel: RiskLevel
}