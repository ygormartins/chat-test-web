/*---------- Interfaces ----------*/
export interface IDatabaseItem {
  partitionKey: string;
  sortKey: string;
  entityType: string;
  gsi1PK?: string;
  gsi1SK?: string;
  gsi2PK?: string;
  gsi2SK?: string;
}
