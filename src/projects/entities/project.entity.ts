export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
}

export class Project {
  id: string;             // string (UUID)
  name: string;           // string
  description: string;    // string
  status: ProjectStatus;  // enum
  deadline: Date | null;  // Date
  ownerId: string;        // string
}