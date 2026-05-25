export type SaddleType = 'dressage' | 'salto'

export interface Saddle {
  id: string
  name: string
  type: SaddleType
  size: string
  material: string
  price: number
  description: string
  sold: boolean
  photos: string[]
  created_at: string
  updated_at: string
}

export type SaddleInput = Omit<Saddle, 'id' | 'created_at' | 'updated_at'>
