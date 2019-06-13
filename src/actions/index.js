export const SAMPLE = 'SAMPLE'

export function sample (data) {
  return {
    type: SAMPLE,
    data: data,
  }
}
