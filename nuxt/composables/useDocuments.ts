import type { DocumentsResponse } from '~/types/dashboard'

export function useDocuments() {
  return useFetch<DocumentsResponse>('/api/documents', {
    key: 'documents',
  })
}
