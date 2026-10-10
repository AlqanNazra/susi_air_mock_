
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service.js';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

const MOCK_SOURCE = {
  today: '2026-05-31',
  thresholds: { warningDays: 30 },
  documents: [
    { id: 'doc_recurrent', label: 'Next Recurrent Date', expiryDate: '2026-10-14' },
    { id: 'doc_ppc', label: 'PPC Exp. Date', expiryDate: '2026-12-25' },
    { id: 'doc_license', label: 'Indonesian License Exp. Date', expiryDate: '2026-05-29' },
    { id: 'doc_medical', label: 'Indonesian Medical Exp. Date', expiryDate: '2026-06-11' },
    { id: 'doc_security', label: 'Security Clearance Exp. Date', expiryDate: '2026-05-01' },
  ],
};

async function createService(source: unknown = MOCK_SOURCE) {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DocumentsService,
      {
        provide: MockDataService,
        useValue: { getDocumentsData: () => source },
      },
    ],
  }).compile();

  return module.get<DocumentsService>(DocumentsService);
}

describe('DocumentsService', () => {
  it('should be defined', async () => {
    expect(await createService()).toBeDefined();
  });

  it('uses the mock-data logical date (2026-05-31) as the reference date', async () => {
    const service = await createService();
    const result = service.getDocuments() as {
      referenceDate: string;
      warningDays: number;
    };
    expect(result.referenceDate).toBe('2026-05-31');
    expect(result.warningDays).toBe(30);
  });

  it('computes the acceptance-test statuses from the JSON rules', async () => {
    const service = await createService();
    const result = service.getDocuments() as {
      documents: { id: string; daysRemaining: number; status: string }[];
    };
    const byId = Object.fromEntries(result.documents.map((d) => [d.id, d]));
    expect(byId.doc_recurrent).toMatchObject({ daysRemaining: 136, status: 'safe' });
    expect(byId.doc_ppc).toMatchObject({ daysRemaining: 208, status: 'safe' });
    expect(byId.doc_license).toMatchObject({ daysRemaining: -2, status: 'expired' });
    expect(byId.doc_medical).toMatchObject({ daysRemaining: 11, status: 'soon' });
    expect(byId.doc_security).toMatchObject({ daysRemaining: -30, status: 'expired' });
  });

  it('applies the exact warning boundary (0 expired, 30 soon, 31 safe)', async () => {
    const service = await createService({
      today: '2026-05-31',
      thresholds: { warningDays: 30 },
      documents: [
        { id: 'today', label: 'Today', expiryDate: '2026-05-31' },
        { id: 'one', label: 'One', expiryDate: '2026-06-01' },
        { id: 'thirty', label: 'Thirty', expiryDate: '2026-06-30' },
        { id: 'thirty-one', label: 'Thirty-one', expiryDate: '2026-07-01' },
      ],
    });
    const result = service.getDocuments() as {
      documents: { id: string; status: string }[];
    };
    const byId = Object.fromEntries(result.documents.map((d) => [d.id, d]));
    expect(byId.today.status).toBe('expired');
    expect(byId.one.status).toBe('soon');
    expect(byId.thirty.status).toBe('soon');
    expect(byId['thirty-one'].status).toBe('safe');
  });
});
