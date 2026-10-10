
import { Injectable } from '@nestjs/common';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

const FALLBACK_REFERENCE_DATE = '2026-05-15';

type DocumentRecord = {
  id: string;
  label: string;
  expiryDate: string;
};

@Injectable()
export class DocumentsService {
  constructor(private readonly mockDataService: MockDataService) {}

  getDocuments() {
    const source = this.mockDataService.getDocumentsData();

    const warningDays: number = source.thresholds.warningDays;
    // Logical current date comes from the mock-data contract (`today`), so the
    // JSON stays the single source of truth. Falls back only if absent.
    const referenceDate: string =
      typeof source.today === 'string' && source.today
        ? source.today
        : FALLBACK_REFERENCE_DATE;
    const referenceTimestamp = this.toTimestamp(referenceDate);

    const documents = (source.documents as DocumentRecord[]).map(
      (document) => {
        const expiryTimestamp = this.toTimestamp(document.expiryDate);

        const daysRemaining = Math.round(
          (expiryTimestamp - referenceTimestamp) / 86_400_000,
        );

        let status: 'expired' | 'soon' | 'safe';
        let color: string;

        if (daysRemaining <= 0) {
          status = 'expired';
          color = 'red';
        } else if (daysRemaining <= warningDays) {
          status = 'soon';
          color = 'amber';
        } else {
          status = 'safe';
          color = 'green';
        }

        return {
          ...document,
          daysRemaining,
          status,
          color,
        };
      },
    );

    return {
      referenceDate,
      warningDays,
      documents,
    };
  }

  private toTimestamp(date: string): number {
    return Date.parse(`${date}T00:00:00.000Z`);
  }
}
