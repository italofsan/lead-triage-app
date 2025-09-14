export type Opportunity = {
  id: number
  name: string
  stage: string
  amount?: number
  accountName: string
}

export type Lead = {
  id: number
  name: string
  company: string
  email: string
  source: string
  score: number
  status: string
}
